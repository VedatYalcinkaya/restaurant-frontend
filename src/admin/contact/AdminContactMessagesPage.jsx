import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listContactMessages, listContactMessagesByStatus, markContactMessageRead, replyContactMessage, deleteContactMessage, selectContactList } from '../../store/slices/contactSlice';
import { toast } from 'react-hot-toast';

const tabs = ['ALL','NEW','READ','REPLIED'];
const statusLabel = (s) => {
  switch (String(s || '').toUpperCase()) {
    case 'NEW': return 'Yeni';
    case 'READ': return 'Okundu';
    case 'REPLIED': return 'Not eklendi';
    default: return s;
  }
};

const AdminContactMessagesPage = () => {
  const dispatch = useDispatch();
  const listState = useSelector(selectContactList);
  const byStatus = useSelector((s) => s.contact.byStatus);
  const [activeTab, setActiveTab] = useState('ALL');
  const [search, setSearch] = useState('');
  const [replyText, setReplyText] = useState('');
  const [openBodyId, setOpenBodyId] = useState(null);

  useEffect(() => {
    if (activeTab === 'ALL') dispatch(listContactMessages({ page: 0, size: 20 }));
    else dispatch(listContactMessagesByStatus({ status: activeTab, page: 0, size: 20 }));
  }, [dispatch, activeTab]);

  const rows = useMemo(() => {
    const src = activeTab === 'ALL' ? (listState.content || []) : (byStatus?.[activeTab]?.content || []);
    if (!search.trim()) return src;
    const q = search.trim().toLowerCase();
    return src.filter(m => m.fullName?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q) || m.phone?.toLowerCase().includes(q) || m.subject?.toLowerCase().includes(q));
  }, [activeTab, listState.content, byStatus, search]);

  const refresh = () => {
    if (activeTab === 'ALL') dispatch(listContactMessages({ page: 0, size: 20 }));
    else dispatch(listContactMessagesByStatus({ status: activeTab, page: 0, size: 20 }));
  };

  const handleMarkRead = async (id) => {
    try { await dispatch(markContactMessageRead(id)).unwrap(); toast.success('Okundu olarak işaretlendi'); refresh(); } catch (e) { toast.error('İşlem başarısız'); }
  };
  const handleReply = async (id) => {
    if (!replyText || !replyText.trim()) { toast.error('Lütfen bir not girin'); return; }
    try { await dispatch(replyContactMessage({ id, adminNotes: replyText.trim() })).unwrap(); toast.success('Not eklendi'); setReplyText(''); refresh(); } catch (e) { toast.error('İşlem başarısız'); }
  };
  const handleDelete = async (id) => {
    if (!confirm('Mesajı silmek istediğinize emin misiniz?')) return;
    try { await dispatch(deleteContactMessage(id)).unwrap(); toast.success('Silindi'); refresh(); } catch (e) { toast.error('Silme başarısız'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">İletişim Mesajları</h1>
      </div>
      <div className="bg-gray-800 rounded-lg p-4 mb-4 flex flex-wrap gap-2 items-center">
        {tabs.map(t => (
          <button key={t} onClick={()=>setActiveTab(t)} className={`px-3 py-1.5 rounded ${activeTab===t?'bg-emerald-600 text-white':'bg-gray-700 text-gray-300'}`}>{t==='ALL'?'Tümü':t}</button>
        ))}
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Ara (ad/email/telefon/konu)" className="ml-auto bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {(activeTab==='ALL' ? listState.loading : byStatus?.[activeTab]?.loading) ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div></div>
        ) : rows.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Kayıt bulunamadı</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-300">Ad</th>
                  <th className="py-3 px-4 text-left text-gray-300">Email</th>
                  <th className="py-3 px-4 text-left text-gray-300">Telefon</th>
                  <th className="py-3 px-4 text-left text-gray-300">Konu</th>
                  <th className="py-3 px-4 text-left text-gray-300">Tarih</th>
                  <th className="py-3 px-4 text-left text-gray-300">Durum</th>
                  <th className="py-3 px-4 text-left text-gray-300">Aksiyonlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {rows.map(m => (
                  <tr key={m.id} className="hover:bg-gray-750">
                    <td className="py-3 px-4 text-white font-medium">{m.fullName}</td>
                    <td className="py-3 px-4 text-gray-300">{m.email}</td>
                    <td className="py-3 px-4 text-gray-300">{m.phone || '-'}</td>
                    <td className="py-3 px-4 text-gray-300">{m.subject || '-'}</td>
                    <td className="py-3 px-4 text-gray-300">{new Date(m.createdAt).toLocaleString()}</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs bg-gray-600 text-white">{statusLabel(m.status)}</span></td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={()=>setOpenBodyId(openBodyId===m.id?null:m.id)} className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs">Detay</button>
                        <button onClick={()=>handleMarkRead(m.id)} className="px-2 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white text-xs">Okundu</button>
                        <button onClick={()=>handleDelete(m.id)} className="px-2 py-1 rounded bg-red-700 hover:bg-red-800 text-white text-xs">Sil</button>
                      </div>
                      {openBodyId===m.id && (
                        <div className="mt-3 bg-gray-900 rounded p-3 text-gray-200">
                          <div className="mb-2"><strong>Mesaj:</strong><div className="text-gray-300 whitespace-pre-wrap">{m.message}</div></div>
                          {m.adminNotes && (
                            <div className="mb-3"><strong>Eklenen Not:</strong><div className="text-gray-300 whitespace-pre-wrap">{m.adminNotes}</div></div>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <input value={replyText} onChange={(e)=>setReplyText(e.target.value)} placeholder="Not ekle (zorunlu)" className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
                            <button onClick={()=>handleReply(m.id)} className="px-3 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-sm">Not Ekle</button>
                          </div>
                        </div>
                      )}
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

export default AdminContactMessagesPage;


