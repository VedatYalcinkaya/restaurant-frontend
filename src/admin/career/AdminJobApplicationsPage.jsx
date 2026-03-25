import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listJobApplications,
  listJobApplicationsByStatus,
  updateJobApplicationStatus,
  deleteJobApplication,
  selectJobApplicationList
} from '../../store/slices/jobApplicationSlice';
import { toast } from 'react-hot-toast';

const statusOptions = ['RECEIVED', 'IN_REVIEW', 'INTERVIEW', 'REJECTED', 'HIRED'];

const statusLabels = {
  RECEIVED: 'Alındı',
  IN_REVIEW: 'İnceleniyor',
  INTERVIEW: 'Mülakat',
  REJECTED: 'Reddedildi',
  HIRED: 'İşe Alındı',
};

const AdminJobApplicationsPage = () => {
  const dispatch = useDispatch();
  const listState = useSelector(selectJobApplicationList);
  const byStatus = useSelector((s) => s.jobApplications.byStatus);
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (activeStatus === 'ALL') {
      dispatch(listJobApplications({ page: 0, size: 10 }));
    } else {
      dispatch(listJobApplicationsByStatus({ status: activeStatus, page: 0, size: 10 }));
    }
  }, [dispatch, activeStatus]);

  const rows = useMemo(() => {
    if (activeStatus === 'ALL') return listState.content || [];
    return byStatus?.[activeStatus]?.content || [];
  }, [activeStatus, listState.content, byStatus]);

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.trim().toLowerCase();
    return rows.filter((a) =>
      a.applicantName?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q) ||
      String(a.positionId || '').includes(q)
    );
  }, [rows, search]);

  const refresh = () => {
    if (activeStatus === 'ALL') dispatch(listJobApplications({ page: 0, size: 10 }));
    else dispatch(listJobApplicationsByStatus({ status: activeStatus, page: 0, size: 10 }));
  };

  const handleUpdateStatus = async (app, status) => {
    try {
      await dispatch(updateJobApplicationStatus({ id: app.id, status, notes: '' })).unwrap();
      toast.success('Durum güncellendi');
      refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Güncelleme başarısız');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Başvuruyu silmek istediğinize emin misiniz?')) return;
    try {
      await dispatch(deleteJobApplication(id)).unwrap();
      toast.success('Başvuru silindi');
      refresh();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Silme işlemi başarısız');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Başvurular</h1>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="hidden md:flex gap-3 items-end">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveStatus('ALL')}
              className={`px-3 py-1.5 rounded ${activeStatus === 'ALL' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Tümü
            </button>
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-3 py-1.5 rounded ${activeStatus === s ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                {statusLabels[s]}
              </button>
            ))}
          </div>
          <input
            placeholder="Ara (ad/e-posta/ilan no)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-auto bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white min-w-[250px]"
          />
        </div>

        <div className="md:hidden space-y-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveStatus('ALL')}
              className={`px-3 py-1.5 rounded text-sm ${activeStatus === 'ALL' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Tümü
            </button>
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-3 py-1.5 rounded text-sm ${activeStatus === s ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                {statusLabels[s]}
              </button>
            ))}
          </div>
          <input
            placeholder="Ara (ad/e-posta/ilan no)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {(activeStatus === 'ALL' ? listState.loading : byStatus?.[activeStatus]?.loading) ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Kayıt bulunamadı</div>
        ) : (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-300">Aday</th>
                    <th className="py-3 px-4 text-left text-gray-300">İletişim</th>
                    <th className="py-3 px-4 text-left text-gray-300">İlan No</th>
                    <th className="py-3 px-4 text-left text-gray-300">Durum</th>
                    <th className="py-3 px-4 text-left text-gray-300">Özgeçmiş</th>
                    <th className="py-3 px-4 text-left text-gray-300">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filtered.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-750 cursor-pointer" onClick={() => setDetail(a)}>
                      <td className="py-3 px-4 text-white">{a.applicantName}</td>
                      <td className="py-3 px-4 text-gray-300">
                        <div>{a.email}</div>
                        {a.phone && <div className="text-xs text-gray-400">{a.phone}</div>}
                      </td>
                      <td className="py-3 px-4 text-gray-300">#{a.positionId}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-600 text-white">
                          {statusLabels[a.status] || a.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {a.resumeUrl ? (
                          <a
                            href={a.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                            onClick={(e) => e.stopPropagation()}
                            download
                          >
                            Görüntüle/İndir
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {statusOptions.map((s) => (
                            <button
                              key={s}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateStatus(a, s);
                              }}
                              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs"
                            >
                              {statusLabels[s]}
                            </button>
                          ))}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(a.id);
                            }}
                            className="px-2 py-1 rounded bg-red-700 hover:bg-red-800 text-white text-xs"
                          >
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden">
              {filtered.map((a) => (
                <div key={a.id} className="p-4 border-b border-gray-700 last:border-b-0">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{a.applicantName}</h3>
                      <p className="text-gray-400 text-sm">#{a.positionId}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-600 text-white">
                      {statusLabels[a.status] || a.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-gray-300 text-sm">
                      <span className="text-gray-400">E-posta:</span> {a.email}
                    </div>
                    {a.phone && (
                      <div className="text-gray-300 text-sm">
                        <span className="text-gray-400">Telefon:</span> {a.phone}
                      </div>
                    )}
                    {a.resumeUrl && (
                      <div className="text-sm">
                        <a
                          href={a.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                          download
                        >
                          Özgeçmişi Görüntüle
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleUpdateStatus(a, s)}
                        className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs"
                      >
                        {statusLabels[s]}
                      </button>
                    ))}
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="px-3 py-1.5 rounded bg-red-700 hover:bg-red-800 text-white text-xs"
                    >
                      Sil
                    </button>
                    <button
                      onClick={() => setDetail(a)}
                      className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs"
                    >
                      Detaylar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDetail(null)}></div>
          <div className="relative bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-[90vw] max-w-2xl max-h-[80vh] overflow-auto">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Başvuru Detayı</h3>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-white">x</button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-sm">Aday</div>
                  <div className="text-white">{detail.applicantName}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">İlan No</div>
                  <div className="text-white">#{detail.positionId}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">E-posta</div>
                  <div className="text-white break-all">{detail.email}</div>
                </div>
                {detail.phone && (
                  <div>
                    <div className="text-gray-400 text-sm">Telefon</div>
                    <div className="text-white">{detail.phone}</div>
                  </div>
                )}
                <div>
                  <div className="text-gray-400 text-sm">Durum</div>
                  <div>
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-600 text-white">
                      {statusLabels[detail.status] || detail.status}
                    </span>
                  </div>
                </div>
                {detail.resumeUrl && (
                  <div>
                    <div className="text-gray-400 text-sm">Özgeçmiş</div>
                    <a href={detail.resumeUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300" download>
                      Görüntüle/İndir
                    </a>
                  </div>
                )}
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Ön Yazı</div>
                <div className="bg-gray-800 border border-gray-700 rounded p-3 text-gray-200 whitespace-pre-wrap">
                  {detail.coverLetter || '-'}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-end gap-2">
              <button onClick={() => setDetail(null)} className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white">Kapat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobApplicationsPage;
