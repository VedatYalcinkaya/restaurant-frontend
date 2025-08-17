import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  listMenuCategoriesPaginated,
  listAllMenuCategories,
  deleteMenuCategory,
  activateMenuCategory,
  deactivateMenuCategory
} from '../../store/slices/menuCategorySlice';
import { IconPlus, IconTrash, IconEdit, IconToggleLeft, IconToggleRight, IconSearch } from '@tabler/icons-react';

const AdminCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paginated = useSelector((s) => s.menuCategories.paginated);
  const simpleList = useSelector((s) => s.menuCategories.list);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(listMenuCategoriesPaginated({ page: 0, size: 50 }));
    dispatch(listAllMenuCategories());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = (paginated.content && paginated.content.length > 0) ? paginated.content : (simpleList.content || []);
    if (!q) return source;
    return source.filter((c) => c.name?.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q));
  }, [paginated.content, simpleList.content, query]);

  const handleToggleActive = async (cat) => {
    try {
      if (cat.active) {
        await dispatch(deactivateMenuCategory(cat.id)).unwrap();
      } else {
        await dispatch(activateMenuCategory(cat.id)).unwrap();
      }
    } finally {
      dispatch(listMenuCategoriesPaginated({ page: 0, size: 50 }));
      dispatch(listAllMenuCategories());
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Sind Sie sicher, dass Sie löschen möchten?')) { // Silmek istediğinize emin misiniz?
      await dispatch(deleteMenuCategory(id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Kategorien {/* Kategoriler */}</h1>
        <Link
          to="/admin/categories/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <IconPlus className="h-5 w-5 mr-2" /> Neue Kategorie {/* Yeni Kategori */}
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kategorie suchen..." // Kategori ara...
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-3 pr-10 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <IconSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {paginated.loading && simpleList.loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Keine Einträge gefunden {/* Kayıt bulunamadı */}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Name {/* Ad */}</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Beschreibung {/* Açıklama */}</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Reihenfolge {/* Sıra */}</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Status {/* Durum */}</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-300">Aktionen {/* İşlemler */}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-750">
                    <td className="py-3 px-4 text-white font-medium">{c.name}</td>
                    <td className="py-3 px-4 text-gray-300">{c.description || '-'}</td>
                    <td className="py-3 px-4 text-gray-300">{c.displayOrder ?? 0}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          c.active ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
                        }`}
                      >
                        {c.active ? 'Aktiv' /* Aktif */ : 'Inaktiv' /* Pasif */}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleActive(c)}
                          className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                          title="Status ändern" // Durum Değiştir
                        >
                          {c.active ? <IconToggleLeft className="h-5 w-5" /> : <IconToggleRight className="h-5 w-5" />}
                        </button>
                        <button
                          onClick={() => navigate(`/admin/categories/edit/${c.id}`)}
                          className="p-1.5 rounded-lg bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
                          title="Bearbeiten" // Düzenle
                        >
                          <IconEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30"
                          title="Löschen" // Sil
                        >
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

export default AdminCategoryPage;
