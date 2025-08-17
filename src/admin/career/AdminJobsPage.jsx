import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listActiveJobs, activateJob, deactivateJob, deleteJob } from '../../store/slices/jobSlice';

const employmentTypeLabels = {
  FULL_TIME: 'Vollzeit',
  PART_TIME: 'Teilzeit',
  INTERNSHIP: 'Praktikum',
  CONTRACT: 'Befristet',
};

const AdminJobsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content = [], loading } = useSelector((s) => s.jobs.activeList);
  const [q, setQ] = useState('');

  useEffect(() => { dispatch(listActiveJobs()); }, [dispatch]);

  const filtered = useMemo(() => {
    if (!q.trim()) return content;
    const term = q.trim().toLowerCase();
    return content.filter(j =>
      j.title?.toLowerCase().includes(term) ||
      j.department?.toLowerCase().includes(term) ||
      j.location?.toLowerCase().includes(term)
    );
  }, [content, q]);

  const toggleActive = async (job) => {
    if (job.active) await dispatch(deactivateJob(job.id));
    else await dispatch(activateJob(job.id));
    dispatch(listActiveJobs());
  };

  const handleDelete = async (id) => {
    if (!confirm('Sind Sie sicher, dass Sie die Stellenanzeige löschen möchten?')) return;
    await dispatch(deleteJob(id));
    dispatch(listActiveJobs());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Stellenanzeigen</h1>
        <Link
          to="/admin/jobs/new"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
        >
          Neue Anzeige
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Suche (Titel/Abteilung/Ort)"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
        />
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Keine Einträge gefunden</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-300">Titel</th>
                  <th className="py-3 px-4 text-left text-gray-300">Abteilung</th>
                  <th className="py-3 px-4 text-left text-gray-300">Ort</th>
                  <th className="py-3 px-4 text-left text-gray-300">Art</th>
                  <th className="py-3 px-4 text-left text-gray-300">Status</th>
                  <th className="py-3 px-4 text-left text-gray-300">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filtered.map((j) => (
                  <tr key={j.id} className="hover:bg-gray-750">
                    <td className="py-3 px-4 text-white font-medium">{j.title}</td>
                    <td className="py-3 px-4 text-gray-300">{j.department}</td>
                    <td className="py-3 px-4 text-gray-300">{j.location}</td>
                    <td className="py-3 px-4 text-gray-300 text-xs">
                      {employmentTypeLabels[j.employmentType] || j.employmentType}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          j.active ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
                        }`}
                      >
                        {j.active ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={()=>toggleActive(j)}
                          className="px-2 py-1 rounded bg-yellow-600/20 text-yellow-400 text-xs"
                        >
                          {j.active ? 'Deaktivieren' : 'Aktivieren'}
                        </button>
                        <button
                          onClick={()=>navigate(`/admin/jobs/edit/${j.id}`)}
                          className="px-2 py-1 rounded bg-blue-600/20 text-blue-400 text-xs"
                        >
                          Bearbeiten
                        </button>
                        <button
                          onClick={()=>handleDelete(j.id)}
                          className="px-2 py-1 rounded bg-red-700/20 text-red-400 text-xs"
                        >
                          Löschen
                        </button>
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

export default AdminJobsPage;
