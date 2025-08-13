import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  listMenusPaginated,
  listAllMenus,
  deleteMenu,
  activateMenu,
  deactivateMenu
} from '../../store/slices/menuSlice';
import { IconPlus, IconTrash, IconEdit, IconToggleLeft, IconToggleRight, IconSearch } from '@tabler/icons-react';

const AdminMenuPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paginated = useSelector((s) => s.menus.paginated);
  const simpleList = useSelector((s) => s.menus.list);

  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(listMenusPaginated({ page: 0, size: 10 }));
    dispatch(listAllMenus());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = (paginated.content && paginated.content.length > 0) ? paginated.content : (simpleList.content || []);
    if (!q) return source;
    return source.filter((m) => m.name?.toLowerCase().includes(q) || m.description?.toLowerCase().includes(q));
  }, [paginated.content, simpleList.content, query]);

  const handleToggleActive = async (menu) => {
    try {
      if (menu.active) {
        await dispatch(deactivateMenu(menu.id)).unwrap();
      } else {
        await dispatch(activateMenu(menu.id)).unwrap();
      }
    } finally {
      // Değişiklik sonrası listeyi tazele
      dispatch(listMenusPaginated({ page: 0, size: 10 }));
      dispatch(listAllMenus());
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      await dispatch(deleteMenu(id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Menüler</h1>
        <Link to="/admin/menus/new" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <IconPlus className="h-5 w-5 mr-2" /> Yeni Menü
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Menü ara..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-3 pr-10 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <IconSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {paginated.loading && simpleList.loading ? (
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
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Görsel</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Ad</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Fiyat</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Durum</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-750">
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 bg-gray-600 rounded overflow-hidden">
                        {m.imageUrl && <img src={m.imageUrl} alt={m.name} className="w-12 h-12 object-cover" />}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-gray-400">#{m.id}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{m.price} €</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${m.active ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                        {m.active ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleToggleActive(m)} className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30" title="Durum Değiştir">
                          {m.active ? <IconToggleLeft className="h-5 w-5" /> : <IconToggleRight className="h-5 w-5" />}
                        </button>
                        <button onClick={() => navigate(`/admin/menus/edit/${m.id}`)} className="p-1.5 rounded-lg bg-blue-500/20 text-blue-500 hover:bg-blue-500/30" title="Düzenle">
                          <IconEdit className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30" title="Sil">
                          <IconTrash className="h-5 w-5" />
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

export default AdminMenuPage;


