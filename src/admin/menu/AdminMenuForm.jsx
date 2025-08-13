import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  createMenu,
  updateMenu,
  createMenuWithImage,
  updateMenuWithImage,
  getMenuById,
  clearMenuCreateState,
  clearMenuUpdateState,
  selectCurrentMenu,
  selectMenuCreating,
  selectMenuUpdating,
} from '../../store/slices/menuSlice';
import { listActiveMenuCategories, selectActiveMenuCategoryList } from '../../store/slices/menuCategorySlice';

const AdminMenuForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = useSelector(selectCurrentMenu);
  const creating = useSelector(selectMenuCreating);
  const updating = useSelector(selectMenuUpdating);
  const categoriesState = useSelector(selectActiveMenuCategoryList);
  const categories = categoriesState?.content || [];

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    ingredients: '',
    categoryId: '',
    available: true,
    active: true,
    displayOrder: 0,
    allergens: '',
    calories: '',
    preparationTimeMinutes: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [existingImageUrl, setExistingImageUrl] = useState('');

  useEffect(() => {
    dispatch(listActiveMenuCategories());
    if (isEdit) dispatch(getMenuById(id));
  }, [dispatch, isEdit, id]);

  useEffect(() => {
    if (isEdit && current) {
      setForm({
        name: current.name || '',
        description: current.description || '',
        price: current.price ?? '',
        ingredients: current.ingredients || '',
        categoryId: current.category?.id || current.categoryId || '',
        available: current.available ?? true,
        active: current.active ?? true,
        displayOrder: current.displayOrder ?? 0,
        allergens: current.allergens || '',
        calories: current.calories ?? '',
        preparationTimeMinutes: current.preparationTimeMinutes ?? '',
      });
      if (current.imageUrl) {
        setExistingImageUrl(current.imageUrl);
        setImagePreview(current.imageUrl);
      }
    }
  }, [isEdit, current]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      description: form.description?.trim() || undefined,
      price: Number(form.price),
      ingredients: form.ingredients?.trim() || undefined,
      categoryId: Number(form.categoryId),
      available: Boolean(form.available),
      active: Boolean(form.active),
      displayOrder: Number(form.displayOrder) || 0,
      allergens: form.allergens?.trim() || undefined,
      calories: form.calories ? Number(form.calories) : undefined,
      preparationTimeMinutes: form.preparationTimeMinutes ? Number(form.preparationTimeMinutes) : undefined,
    };

    try {
      if (isEdit) {
        if (imageFile) {
          await dispatch(updateMenuWithImage({ id, menuData: { id: Number(id), ...payload }, imageFile })).unwrap();
        } else {
          // Görsel seçilmediyse mevcut görseli koru
          await dispatch(updateMenu({ id, payload: { id: Number(id), imageUrl: existingImageUrl || undefined, ...payload } })).unwrap();
        }
        dispatch(clearMenuUpdateState());
      } else {
        if (imageFile) {
          await dispatch(createMenuWithImage({ menuData: payload, imageFile })).unwrap();
        } else {
          await dispatch(createMenu(payload)).unwrap();
        }
        dispatch(clearMenuCreateState());
      }
      navigate('/admin/menus');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Lütfen bir resim dosyası seçin');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Resim 5MB sınırını aşamaz');
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">{isEdit ? 'Menü Düzenle' : 'Yeni Menü'}</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Ad</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Açıklama</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Fiyat (€)</label>
            <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">İçindekiler</label>
            <input name="ingredients" value={form.ingredients} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Kategori</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white">
              <option value="">Seçiniz</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Sıra</label>
              <input type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Kalori</label>
              <input type="number" name="calories" value={form.calories} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Hazırlama (dk)</label>
              <input type="number" name="preparationTimeMinutes" value={form.preparationTimeMinutes} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Alerjenler</label>
              <input name="allergens" value={form.allergens} onChange={handleChange} maxLength={100} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center text-gray-300">
              <input type="checkbox" name="available" checked={form.available} onChange={handleChange} className="mr-2" />
              Uygun (available)
            </label>
            <label className="inline-flex items-center text-gray-300">
              <input type="checkbox" name="active" checked={form.active} onChange={handleChange} className="mr-2" />
              Aktif
            </label>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Görsel</label>
            <div className="flex items-start gap-4">
              <div className="w-28 h-28 bg-gray-700 border border-gray-600 rounded-lg overflow-hidden flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Önizleme" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-xs">Önizleme</span>
                )}
              </div>
              <div className="space-y-2">
                <label className="inline-block bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">
                  Resim Seç
                  <input type="file" accept="image/*" onChange={(e) => handleSelectFile(e.target.files?.[0] || null)} className="hidden" />
                </label>
                {existingImageUrl && !imageFile && (
                  <div className="text-xs text-gray-400">Mevcut görsel korunacak.</div>
                )}
                {imageFile && (
                  <div className="text-xs text-gray-400">Seçilen dosya: {imageFile.name}</div>
                )}
                {imagePreview && imageFile && (
                  <button type="button" onClick={() => { setImageFile(null); setImagePreview(existingImageUrl || ''); }} className="text-xs text-red-400 hover:text-red-300">Seçimi kaldır</button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <button type="submit" disabled={creating || updating} className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-6 py-2 rounded-lg">
            {isEdit ? 'Güncelle' : 'Oluştur'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminMenuForm;


