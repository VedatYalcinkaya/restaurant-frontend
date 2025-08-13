import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { 
  listReservations,
  listReservationsByStatus,
  listReservationsByDateRange,
  listReservationsByDateRangeAndStatus,
  confirmReservation,
  cancelReservation,
  completeReservation,
  noShowReservation
} from '../../store/slices/reservationSlice';
import { deleteReservation, deleteFinalizedReservations } from '../../store/slices/reservationSlice';

const AdminReservationPage = () => {
  const dispatch = useDispatch();
  const listState = useSelector((s) => s.reservations.list);
  const byStatus = useSelector((s) => s.reservations.byStatus);

  const [activeTab, setActiveTab] = useState('ALL');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('dateDesc');
  const [processingId, setProcessingId] = useState(null);
  const ACTION_BLOCKED_STATUSES = useMemo(() => new Set(['CANCELED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']), []);
  const isBlocked = (status) => ACTION_BLOCKED_STATUSES.has(String(status || '').toUpperCase());
  const blockedActionNote = (status) => {
    const s = String(status || '').toUpperCase();
    if (s === 'CANCELLED') return 'İptal edilenlerde işlem yapılamaz';
    if (s === 'COMPLETED') return 'Tamamlananlarda işlem yapılamaz';
    if (s === 'NO_SHOW') return 'Gelmedi olarak işaretlenenlerde işlem yapılamaz';
    return 'İşlem yapılamaz';
  };

  useEffect(() => {
    if (activeTab === 'ALL') {
      if (dateStart && dateEnd) dispatch(listReservationsByDateRange({ startDate: dateStart, endDate: dateEnd }));
      else dispatch(listReservations({ page: 0, size: 100 }));
    } else {
      if (dateStart && dateEnd) dispatch(listReservationsByDateRangeAndStatus({ startDate: dateStart, endDate: dateEnd, status: activeTab }));
      else dispatch(listReservationsByStatus({ status: activeTab }));
    }
  }, [dispatch, activeTab, dateStart, dateEnd]);

  const handleAction = async (action, id) => {
    setProcessingId(id);
    const nextTabMap = {
      confirm: 'CONFIRMED',
      complete: 'COMPLETED',
      noShow: 'NO_SHOW',
      cancel: 'CANCELLED',
    };
    const successMsgMap = {
      confirm: 'Rezervasyon onaylandı',
      complete: 'Rezervasyon tamamlandı',
      noShow: 'Rezervasyon no-show olarak işaretlendi',
      cancel: 'Rezervasyon iptal edildi',
    };
    try {
      // İşlem engelli statüler için uyarı
      const currentItem = (listState.content || []).concat(
        ...Object.values(byStatus || {}).map((s) => s.content || [])
      ).find((r) => r.id === id);
      if (currentItem && isBlocked(currentItem.status)) {
        toast.error('Tamamlanan veya iptal edilen rezervasyon üzerinde işlem yapılamaz.');
        return;
      }
      switch (action) {
        case 'confirm':
          await dispatch(confirmReservation({ id })).unwrap();
          break;
        case 'cancel':
          await dispatch(cancelReservation({ id })).unwrap();
          break;
        case 'complete':
          await dispatch(completeReservation({ id })).unwrap();
          break;
        case 'noShow':
          await dispatch(noShowReservation({ id })).unwrap();
          break;
        default:
          break;
      }
      toast.success(successMsgMap[action] || 'İşlem başarılı');
      // Hedef sekmeye geç -> useEffect gerekli listeyi çeker
      const nextTab = nextTabMap[action];
      if (nextTab) setActiveTab(nextTab);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'İşlem başarısız';
      toast.error(msg);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteOne = async (id) => {
    if (!confirm('Bu rezervasyonu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;
    try {
      await dispatch(deleteReservation(id)).unwrap();
      toast.success('Rezervasyon silindi');
      // Listeyi tazele
      if (activeTab === 'ALL') dispatch(listReservations({ page: 0, size: 100 }));
      else dispatch(listReservationsByStatus({ status: activeTab }));
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Silme başarısız');
    }
  };

  const handleDeleteFinalized = async () => {
    if (!confirm('Tüm tamamlanan/iptal edilen/gelmeyen rezervasyonlar silinecek. Devam etmek istiyor musunuz?')) return;
    try {
      const res = await dispatch(deleteFinalizedReservations()).unwrap();
      const msg = typeof res === 'string' ? res : (res?.message || 'Temizlik tamamlandı');
      toast.success(msg);
      // Aktif sekmeye göre yenile
      if (activeTab === 'ALL') dispatch(listReservations({ page: 0, size: 100 }));
      else dispatch(listReservationsByStatus({ status: activeTab }));
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Toplu silme başarısız');
    }
  };

  const rawItems = useMemo(() => {
    if (activeTab === 'ALL') return listState.content || [];
    const st = byStatus?.[activeTab];
    return st?.content || [];
  }, [activeTab, listState.content, byStatus]);

  const filteredAndSorted = useMemo(() => {
    let items = rawItems;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter((r) =>
        r.customerName?.toLowerCase().includes(q) ||
        r.customerSurname?.toLowerCase().includes(q) ||
        r.customerPhone?.toLowerCase().includes(q) ||
        r.customerEmail?.toLowerCase().includes(q)
      );
    }
    items = [...items].sort((a, b) => {
      const aDate = new Date(`${a.reservationDate} ${a.reservationTime}`);
      const bDate = new Date(`${b.reservationDate} ${b.reservationTime}`);
      switch (sortBy) {
        case 'dateAsc': return aDate - bDate;
        case 'guestAsc': return (a.guestCount || 0) - (b.guestCount || 0);
        case 'guestDesc': return (b.guestCount || 0) - (a.guestCount || 0);
        case 'dateDesc':
        default: return bDate - aDate;
      }
    });
    return items;
  }, [rawItems, search, sortBy]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Rezervasyonlar</h1>

      {/* Sekmeler */}
      <div className="mb-4 flex flex-wrap gap-2">
        {['ALL','PENDING','CONFIRMED','COMPLETED','NO_SHOW','CANCELLED'].map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1.5 rounded-lg text-sm ${activeTab===t?'bg-emerald-600 text-white':'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            {t === 'ALL' ? 'Tümü' : t}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button onClick={handleDeleteFinalized} className="px-3 py-1.5 rounded-lg text-sm bg-red-700 hover:bg-red-800 text-white">
            Final (Tamamlanan/İptal/Gelmedi) Temizle
          </button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Başlangıç</label>
          <input type="date" value={dateStart} onChange={(e)=>setDateStart(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-2 text-white" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Bitiş</label>
          <input type="date" value={dateEnd} onChange={(e)=>setDateEnd(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-2 text-white" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Ara</label>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="İsim, telefon, e-posta..." className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-2 text-white" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Sırala</label>
          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-2 text-white">
            <option value="dateDesc">Tarih (yeni → eski)</option>
            <option value="dateAsc">Tarih (eski → yeni)</option>
            <option value="guestDesc">Kişi (azalan)</option>
            <option value="guestAsc">Kişi (artan)</option>
          </select>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="px-4 py-2 text-xs text-gray-300 bg-gray-750/50 border-b border-gray-700">
          Not: Tamamlanan ve iptal edilen rezervasyonlar üzerinde tekrar işlem yapılamaz.
        </div>
        {(activeTab==='ALL' ? listState.loading : (byStatus?.[activeTab]?.loading)) ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredAndSorted.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Kayıt bulunamadı</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Müşteri</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">İletişim</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Tarih/Saat</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Kişi</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Durum</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredAndSorted.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-750">
                    <td className="py-3 px-4 text-white">{r.customerName} {r.customerSurname}</td>
                    <td className="py-3 px-4 text-gray-300">
                      <div>{r.customerPhone || '-'}</div>
                      <div className="text-xs text-gray-400">{r.customerEmail || '-'}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{r.reservationDate} {r.reservationTime}</td>
                    <td className="py-3 px-4 text-gray-300">{r.guestCount}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-600 text-white">{r.status}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {isBlocked(r.status) ? (
                          <span className="text-xs text-gray-400 italic">{blockedActionNote(r.status)}</span>
                        ) : (
                          <>
                        <button disabled={processingId===r.id} onClick={() => handleAction('confirm', r.id)} className={`px-2 py-1 rounded text-white text-xs ${processingId===r.id? 'opacity-60 cursor-not-allowed bg-emerald-600':'bg-emerald-600 hover:bg-emerald-700'}`}>Onayla</button>
                        <button disabled={processingId===r.id} onClick={() => handleAction('complete', r.id)} className={`px-2 py-1 rounded text-white text-xs ${processingId===r.id? 'opacity-60 cursor-not-allowed bg-blue-600':'bg-blue-600 hover:bg-blue-700'}`}>Tamamlandı</button>
                        <button disabled={processingId===r.id} onClick={() => handleAction('noShow', r.id)} className={`px-2 py-1 rounded text-white text-xs ${processingId===r.id? 'opacity-60 cursor-not-allowed bg-yellow-600':'bg-yellow-600 hover:bg-yellow-700'}`}>Gelmedi</button>
                        <button disabled={processingId===r.id} onClick={() => handleAction('cancel', r.id)} className={`px-2 py-1 rounded text-white text-xs ${processingId===r.id? 'opacity-60 cursor-not-allowed bg-red-600':'bg-red-600 hover:bg-red-700'}`}>İptal</button>
                          </>
                        )}
                        <button onClick={() => handleDeleteOne(r.id)} className="px-2 py-1 rounded text-white text-xs bg-red-700 hover:bg-red-800">Sil</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservationPage;


