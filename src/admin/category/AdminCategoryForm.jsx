import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createMenuCategory,
  updateMenuCategory,
  getMenuCategoryById,
  selectCurrentMenuCategory,
  clearMenuCategoryCreateState,
  clearMenuCategoryUpdateState
} from '../../store/slices/menuCategorySlice';

const AdminCategoryForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = useSelector(selectCurrentMenuCategory);

  const [form, setForm] = useState({
    name: '',
    description: '',
    displayOrder: 0,
    active: true,
  });

  useEffect(() => {
    if (isEdit) dispatch(getMenuCategoryById(id));
  }, [dispatch, isEdit, id]);

  useEffect(() => {
    if (isEdit && current) {
      setForm({
        name: current.name || '',
        description: current.description || '',
        displayOrder: current.displayOrder ?? 0,
        active: current.active ?? true,
      });
    }
  }, [isEdit, current]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      description: form.description?.trim() || undefined,
      displayOrder: Number(form.displayOrder) || 0,
      active: Boolean(form.active),
    };

    try {
      if (isEdit) {
        await dispatch(updateMenuCategory({ id, payload: { id: Number(id), ...payload } })).unwrap();
        dispatch(clearMenuCategoryUpdateState());
      } else {
        await dispatch(createMenuCategory(payload)).unwrap();
        dispatch(clearMenuCategoryCreateState());
      }
      navigate('/admin/categories');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">{isEdit ? 'Kategori Düzenle' : 'Yeni Kategori'}</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Ad</label>
          <input name="name" value={form.name} onChange={handleChange} required minLength={2} maxLength={100} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Açıklama</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} maxLength={500} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Sıra</label>
            <input type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center text-gray-300">
              <input type="checkbox" name="active" checked={form.active} onChange={handleChange} className="mr-2" />
              Aktif
            </label>
          </div>
        </div>
        <div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">{isEdit ? 'Güncelle' : 'Oluştur'}</button>
        </div>
      </form>
    </div>
  );
};

export default AdminCategoryForm;


