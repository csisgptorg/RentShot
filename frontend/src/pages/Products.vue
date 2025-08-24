<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
        >
          🛍️ مدیریت محصولات
        </h1>
        <p class="text-xl text-gray-600">
          افزودن، ویرایش و مدیریت محصولات فروشگاه
        </p>
      </div>

      <!-- Add Product Form -->
      <div
        class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 mb-8 border border-white/20"
      >
        <h2
          class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
        >
          <span class="text-3xl">➕</span>
          افزودن محصول جدید
        </h2>

        <form
          @submit.prevent="create"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >نام محصول</label
            >
            <input
              v-model="form.name"
              type="text"
              placeholder="نام محصول را وارد کنید"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >قیمت (تومان)</label
            >
            <input
              v-model.number="form.price"
              type="number"
              placeholder="قیمت به تومان"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >موجودی</label
            >
            <input
              v-model.number="form.quantity"
              type="number"
              placeholder="تعداد موجودی"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >دسته‌بندی</label
            >
            <input
              v-model="form.category"
              type="text"
              placeholder="دسته‌بندی محصول"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >تصویر محصول</label
            >
            <div class="space-y-3">
              <!-- Image Upload -->
              <div>
                <label class="block text-xs text-gray-500 mb-1"
                  >آپلود فایل عکس</label
                >
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <!-- OR -->
              <div class="text-center text-gray-400">یا</div>

              <!-- Image URL -->
              <div>
                <label class="block text-xs text-gray-500 mb-1"
                  >آدرس تصویر (URL)</label
                >
                <input
                  v-model="form.imageUrl"
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <!-- Image Preview -->
              <div v-if="imagePreview" class="mt-3">
                <label class="block text-xs text-gray-500 mb-1"
                  >پیش‌نمایش تصویر</label
                >
                <div class="relative inline-block">
                  <img
                    :src="imagePreview"
                    alt="پیش‌نمایش"
                    class="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    @click="clearImage"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-end">
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="loading" class="animate-spin">⏳</span>
              <span v-else>➕</span>
              {{ loading ? "در حال افزودن..." : "افزودن محصول" }}
            </button>
          </div>
        </form>
      </div>

      <!-- Products List -->
      <div
        class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden"
      >
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <span class="text-3xl">📦</span>
            لیست محصولات
            <span
              class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ products.length }} محصول
            </span>
          </h2>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-16">
          <div class="flex flex-col items-center">
            <svg
              class="animate-spin h-12 w-12 text-purple-600 mb-4"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p class="text-lg font-medium text-gray-700">
              در حال بارگذاری محصولات...
            </p>
          </div>
        </div>

        <!-- Products Table -->
        <div v-else-if="products.length > 0" class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  شناسه
                </th>
                <th
                  class="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  تصویر
                </th>
                <th
                  class="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  نام محصول
                </th>
                <th
                  class="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  قیمت
                </th>
                <th
                  class="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  موجودی
                </th>
                <th
                  class="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  دسته‌بندی
                </th>
                <th
                  class="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="p in products"
                :key="p.productId"
                class="hover:bg-gray-50 transition-colors duration-200"
              >
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ p.productId }}
                </td>
                <td class="px-6 py-4">
                  <div v-if="getProductImageUrl(p)" class="w-16 h-16">
                    <img
                      :src="getProductImageUrl(p)"
                      :alt="p.name"
                      class="w-full h-full object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                  <div
                    v-else
                    class="w-16 h-16 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center"
                  >
                    <span class="text-gray-400 text-xs">بدون عکس</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  {{ p.name }}
                </td>
                <td class="px-6 py-4">
                  <input
                    type="number"
                    v-model.number="p.price"
                    class="w-24 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </td>
                <td class="px-6 py-4">
                  <input
                    type="number"
                    v-model.number="p.quantity"
                    class="w-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </td>
                <td class="px-6 py-4">
                  <span
                    class="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {{ p.category }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button
                      @click="save(p)"
                      class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium flex items-center gap-1"
                    >
                      💾 ذخیره
                    </button>
                    <button
                      @click="remove(p.productId)"
                      class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium flex items-center gap-1"
                    >
                      🗑️ حذف
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">📭</div>
          <h3 class="text-2xl font-bold text-gray-600 mb-2">
            محصولی موجود نیست
          </h3>
          <p class="text-gray-500">محصول جدیدی اضافه کنید</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/admin";

const products = ref([]);
const loading = ref(true);
const imagePreview = ref("");
const imageFile = ref(null);
const form = ref({
  name: "",
  price: 0,
  quantity: 0,
  category: "",
  imageUrl: "",
  imageData: "",
  imageName: "",
  imageType: "",
});

async function load() {
  try {
    loading.value = true;
    const { data } = await getProducts();
    products.value = data;
  } catch (error) {
    console.error("Error loading products:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(load);

// Watch for imageUrl changes to show preview
watch(
  () => form.value.imageUrl,
  (newUrl) => {
    if (newUrl && !form.value.imageData) {
      imagePreview.value = newUrl;
    } else if (!newUrl && !form.value.imageData) {
      imagePreview.value = "";
    }
  }
);

async function create() {
  try {
    loading.value = true;
    await createProduct(form.value);
    form.value = {
      name: "",
      price: 0,
      quantity: 0,
      category: "",
      imageUrl: "",
      imageData: "",
      imageName: "",
      imageType: "",
    };
    clearImage();
    await load();
  } catch (error) {
    console.error("Error creating product:", error);
  } finally {
    loading.value = false;
  }
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    alert("لطفاً فقط فایل تصویری انتخاب کنید");
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert("حجم فایل نباید بیشتر از ۵ مگابایت باشد");
    return;
  }

  imageFile.value = file;

  // Read file as base64
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64Data = e.target.result;
    imagePreview.value = base64Data;
    form.value.imageData = base64Data.split(",")[1]; // Remove data:image/jpeg;base64, prefix
    form.value.imageName = file.name;
    form.value.imageType = file.type;
    form.value.imageUrl = ""; // Clear URL if file is uploaded
  };
  reader.readAsDataURL(file);
}

function clearImage() {
  imagePreview.value = "";
  imageFile.value = null;
  form.value.imageData = "";
  form.value.imageName = "";
  form.value.imageType = "";
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.value = "";
  }
}

function getProductImageUrl(product) {
  if (product.imageData) {
    return `data:${product.imageType || "image/jpeg"};base64,${
      product.imageData
    }`;
  } else if (product.imageUrl) {
    return product.imageUrl;
  }
  return null;
}

async function save(p) {
  try {
    await updateProduct(p.productId, { price: p.price, quantity: p.quantity });
    await load();
  } catch (error) {
    console.error("Error updating product:", error);
  }
}

async function remove(id) {
  try {
    if (confirm("آیا از حذف این محصول مطمئن هستید؟")) {
      await deleteProduct(id);
      await load();
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}
</script>
