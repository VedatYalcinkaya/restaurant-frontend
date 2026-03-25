import React, { useEffect, useMemo } from "react";
import { motion as Motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  listActiveMenuCategories,
  selectActiveMenuCategoryList,
} from "../store/slices/menuCategorySlice";
import {
  listAvailableMenus,
  selectAvailableMenuList,
} from "../store/slices/menuSlice";

const MenuPage = () => {
  const dispatch = useDispatch();

  const activeCategoriesState = useSelector(selectActiveMenuCategoryList);
  const availableMenusState = useSelector(selectAvailableMenuList);

  const categories = activeCategoriesState?.content || [];
  const isLoading = Boolean(activeCategoriesState?.loading || availableMenusState?.loading);

  useEffect(() => {
    dispatch(listActiveMenuCategories());
    dispatch(listAvailableMenus());
  }, [dispatch]);

  const groupedMenusByCategory = useMemo(() => {
    const groups = new Map();
    const items = availableMenusState?.content || [];

    for (const item of items) {
      const categoryId = item?.category?.id ?? item?.categoryId;
      if (!groups.has(categoryId)) groups.set(categoryId, []);
      groups.get(categoryId).push(item);
    }

    for (const [key, arr] of groups.entries()) {
      arr.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
      groups.set(key, arr);
    }

    return groups;
  }, [availableMenusState?.content]);

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "";
    try {
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
      }).format(price);
    } catch {
      return `${price} TL`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ink mx-auto mb-4"></div>
          <p className="text-ink">Menü yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">Menümüz</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ala Söğüş&apos;ün özenle hazırlanan lezzetlerini ve günlük servis
            seçeneklerini inceleyin.
          </p>
        </Motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-ink mb-3">{category.name}</h2>
              <p className="text-gray-600 mb-6">{category.description}</p>

              <div className="space-y-4">
                {(groupedMenusByCategory.get(category.id) || []).length > 0 ? (
                  (groupedMenusByCategory.get(category.id) || []).map((item) => (
                    <div key={item.id} className="flex items-start gap-4 border-b border-gray-100 pb-4">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          loading="lazy"
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-ink">{item.name}</h4>
                        {item.description && (
                          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        )}
                        {item.allergens && item.allergens.trim() !== "" && (
                          <p className="text-gray-400 text-xs mt-1">
                            Alerjen bilgisi: {item.allergens}
                          </p>
                        )}
                      </div>
                      <div className="text-accent font-semibold whitespace-nowrap ml-auto">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-accent font-medium">Çok yakında eklenecek</p>
                )}
              </div>
            </Motion.div>
          ))}
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 bg-paper rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-ink mb-4">Masanızı Ayırtın</h3>
          <p className="text-gray-600 mb-6">
            Kalabalık gelmeyi planlıyorsanız rezervasyonunuzu önceden bırakın.
          </p>
          <Link
            to="/reservation"
            className="inline-flex bg-accent hover:bg-ink text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            Hemen Rezervasyon Yap
          </Link>
        </Motion.div>
      </div>
    </div>
  );
};

export default MenuPage;
