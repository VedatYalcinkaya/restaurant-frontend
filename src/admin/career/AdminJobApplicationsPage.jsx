import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listJobApplications, listJobApplicationsByStatus, updateJobApplicationStatus, deleteJobApplication, selectJobApplicationList } from '../../store/slices/jobApplicationSlice';
import { toast } from 'react-hot-toast';

const statusOptions = ['RECEIVED','IN_REVIEW','INTERVIEW','REJECTED','HIRED'];

const AdminJobApplicationsPage = () => {
  const dispatch = useDispatch();
  const listState = useSelector(selectJobApplicationList);
  const byStatus = useSelector((s) => s.jobApplications.byStatus);
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [search, setSearch] = useState('');

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
    return rows.filter(a => a.applicantName?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || String(a.positionId || '').includes(q));
  }, [rows, search]);

  const handleUpdateStatus = async (app, status) => {
    try {
      await dispatch(updateJobApplicationStatus({ id: app.id, status, notes: '' })).unwrap();
      toast.success('Durum güncellendi');
      if (activeStatus === 'ALL') dispatch(listJobApplications({ page: 0, size: 10 }));
      else dispatch(listJobApplicationsByStatus({ status: activeStatus, page: 0, size: 10 }));
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Güncelleme başarısız');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Başvuruyu silmek istediğinize emin misiniz?')) return;
    try {
      await dispatch(deleteJobApplication(id)).unwrap();
      toast.success('Başvuru silindi');
      if (activeStatus === 'ALL') dispatch(listJobApplications({ page: 0, size: 10 }));
      else dispatch(listJobApplicationsByStatus({ status: activeStatus, page: 0, size: 10 }));
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Silme başarısız');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">İş Başvuruları</h1>
      </div>
      <div className="bg-gray-800 rounded-lg p-4 mb-4 flex gap-3 items-end">
        <div className="flex gap-2">
          <button onClick={()=>setActiveStatus('ALL')} className={`px-3 py-1.5 rounded ${activeStatus==='ALL'?'bg-emerald-600 text-white':'bg-gray-700 text-gray-300'}`}>Tümü</button>
          {statusOptions.map(s => (
            <button key={s} onClick={()=>setActiveStatus(s)} className={`px-3 py-1.5 rounded ${activeStatus===s?'bg-emerald-600 text-white':'bg-gray-700 text-gray-300'}`}>{s}</button>
          ))}
        </div>
        <input placeholder="Ara (ad/e-posta/ilan id)" value={search} onChange={(e)=>setSearch(e.target.value)} className="ml-auto bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {(activeStatus === 'ALL' ? listState.loading : byStatus?.[activeStatus]?.loading) ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Kayıt bulunamadı</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-300">Aday</th>
                  <th className="py-3 px-4 text-left text-gray-300">İletişim</th>
                  <th className="py-3 px-4 text-left text-gray-300">İlan</th>
                  <th className="py-3 px-4 text-left text-gray-300">Durum</th>
                  <th className="py-3 px-4 text-left text-gray-300">CV</th>
                  <th className="py-3 px-4 text-left text-gray-300">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-750">
                    <td className="py-3 px-4 text-white">{a.applicantName}</td>
                    <td className="py-3 px-4 text-gray-300">
                      <div>{a.email}</div>
                      {a.phone && <div className="text-xs text-gray-400">{a.phone}</div>}
                    </td>
                    <td className="py-3 px-4 text-gray-300">#{a.positionId}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-600 text-white">{a.status}</span>
                    </td>
                    <td className="py-3 px-4">
                      {a.resumeUrl ? (
                        <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300" download>
                          Görüntüle/İndir
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {statusOptions.map(s => (
                          <button key={s} onClick={()=>handleUpdateStatus(a, s)} className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs">{s}</button>
                        ))}
                        <button onClick={()=>handleDelete(a.id)} className="px-2 py-1 rounded bg-red-700 hover:bg-red-800 text-white text-xs">Sil</button>
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

export default AdminJobApplicationsPage;


