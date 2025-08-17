import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listContactMessages,
  listContactMessagesByStatus,
  markContactMessageRead,
  replyContactMessage,
  deleteContactMessage,
  selectContactList
} from '../../store/slices/contactSlice';
import { toast } from 'react-hot-toast';

const tabs = ['ALL','NEW','READ','REPLIED'];

const statusLabels = {
  NEW: 'Neu',
  READ: 'Gelesen',
  REPLIED: 'Notiz hinzugefügt',
};

const normalize = (str) =>
  (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, ''); // ö->o, ü->u, ß->ss vb.

const AdminContactMessagesPage = () => {
  const dispatch = useDispatch();
  const listState = useSelector(selectContactList);
  const byStatus = useSelector((s) => s.contact.byStatus);

  const [activeTab, setActiveTab] = useState('ALL');
  const [search, setSearch] = useState('');
  const [openBodyId, setOpenBodyId] = useState(null);
  const [replyTexts, setReplyTexts] = useState({}); // { [id]: text }

  useEffect(() => {
    if (activeTab === 'ALL') {
      dispatch(listContactMessages({ page: 0, size: 20 }));
    } else {
      dispatch(listContactMessagesByStatus({ status: activeTab, page: 0, size: 20 }));
    }
  }, [dispatch, activeTab]);

  const rows = useMemo(() => {
    const src = activeTab === 'ALL' ? (listState.content || []) : (byStatus?.[activeTab]?.content || []);
    if (!search.trim()) return src;
    const q = normalize(search);
    return src.filter(m =>
      normalize(m.fullName).includes(q) ||
      normalize(m.email).includes(q) ||
      normalize(m.phone).includes(q) ||
      normalize(m.subject).includes(q)
    );
  }, [activeTab, listState.content, byStatus, search]);

  const refresh = () => {
    if (activeTab === 'ALL') dispatch(listContactMessages({ page: 0, size: 20 }));
    else dispatch(listContactMessagesByStatus({ status: activeTab, page: 0, size: 20 }));
  };

  const handleMarkRead = async (id) => {
    try {
      await dispatch(markContactMessageRead(id)).unwrap();
      toast.success('Als gelesen markiert');
      refresh();
    } catch (e) {
      toast.error('Vorgang fehlgeschlagen');
    }
  };

  const handleReply = async (id) => {
    const text = (replyTexts[id] || '').trim();
    if (!text) { toast.error('Bitte eine Notiz eingeben'); return; }
    try {
      await dispatch(replyContactMessage({ id, adminNotes: text })).unwrap();
      toast.success('Notiz hinzugefügt');
      setReplyTexts(prev => ({ ...prev, [id]: '' }));
      refresh();
    } catch (e) {
      toast.error('Vorgang fehlgeschlagen');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Sind Sie sicher, dass Sie die Nachricht löschen möchten?')) return;
    try {
      await dispatch(deleteContactMessage(id)).unwrap();
      toast.success('Gelöscht');
      refresh();
    } catch (e) {
      toast.error('Löschen fehlgeschlagen');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Kontaktanfragen</h1>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-4 flex flex-wrap gap-2 items-center">
        {tabs.map(t => (
          <button
            key={t}
            onClick={()=>setActiveTab(t)}
            className={`px-3 py-1.5 rounded ${activeTab===t?'bg-emerald-600 text-white':'bg-gray-700 text-gray-300'}`}
          >
            {t === 'ALL' ? 'Alle' : (statusLabels[t] || t)}
          </button>
        ))}
        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Suchen (Name/E-Mail/Telefon/Betreff)"
          className="ml-auto bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
        />
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {(activeTab==='ALL' ? listState.loading : byStatus?.[activeTab]?.loading) ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Keine Einträge gefunden</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-300">Name</th>
                  <th className="py-3 px-4 text-left text-gray-300">E-Mail</th>
                  <th className="py-3 px-4 text-left text-gray-300">Telefon</th>
                  <th className="py-3 px-4 text-left text-gray-300">Betreff</th>
                  <th className="py-3 px-4 text-left text-gray-300">Datum</th>
                  <th className="py-3 px-4 text-left text-gray-300">Status</th>
                  <th className="py-3 px-4 text-left text-gray-300">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {rows.map(m => (
                  <tr key={m.id} className="hover:bg-gray-750">
                    <td className="py-3 px-4 text-white font-medium">{m.fullName}</td>
                    <td className="py-3 px-4 text-gray-300">{m.email}</td>
                    <td className="py-3 px-4 text-gray-300">{m.phone || '-'}</td>
                    <td className="py-3 px-4 text-gray-300">{m.subject || '-'}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {new Date(m.createdAt).toLocaleString('de-DE')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-600 text-white">
                        {statusLabels[(m.status || '').toUpperCase()] || m.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={()=>setOpenBodyId(openBodyId===m.id?null:m.id)}
                          className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs"
                        >
                          Details
                        </button>

                        {/* "Als gelesen markieren" yalnızca NEW durumunda */}
                        {(m.status || '').toUpperCase() === 'NEW' && (
                          <button
                            onClick={()=>handleMarkRead(m.id)}
                            className="px-2 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white text-xs"
                          >
                            Als gelesen markieren
                          </button>
                        )}

                        <button
                          onClick={()=>handleDelete(m.id)}
                          className="px-2 py-1 rounded bg-red-700 hover:bg-red-800 text-white text-xs"
                        >
                          Löschen
                        </button>
                      </div>

                      {openBodyId===m.id && (
                        <div className="mt-3 bg-gray-900 rounded p-3 text-gray-200">
                          <div className="mb-2">
                            <strong>Nachricht:</strong>
                            <div className="text-gray-300 whitespace-pre-wrap">{m.message}</div>
                          </div>

                          {m.adminNotes && (
                            <div className="mb-3">
                              <strong>Hinzugefügte Notiz:</strong>
                              <div className="text-gray-300 whitespace-pre-wrap">{m.adminNotes}</div>
                            </div>
                          )}

                          <div className="flex items-center gap-2 mt-2">
                            <input
                              value={replyTexts[m.id] || ''}
                              onChange={(e)=>setReplyTexts(prev => ({ ...prev, [m.id]: e.target.value }))}
                              placeholder="Notiz hinzufügen (Pflichtfeld)"
                              className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                            />
                            <button
                              onClick={()=>handleReply(m.id)}
                              className="px-3 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-sm"
                            >
                              Notiz hinzufügen
                            </button>
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
