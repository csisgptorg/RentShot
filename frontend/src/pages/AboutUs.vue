<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100"
  >
    <!-- Hero Section -->
    <div class="relative w-full h-96 md:h-[500px] overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"
      ></div>
      <div class="absolute inset-0 bg-black/30"></div>
      <div
        class="relative h-full flex items-center justify-center text-center text-white p-8"
      >
        <div class="max-w-4xl">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            درباره RentShot
          </h1>
          <p class="text-xl md:text-2xl mb-8 drop-shadow-md">
            پلتفرم پیشرو اجاره محصولات در ایران
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Company Info -->
      <div class="text-center mb-16">
        <h2
          class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8"
        >
          🚀 ماموریت ما
        </h2>
        <p class="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          RentShot با هدف ایجاد تحولی در نحوه دسترسی مردم به محصولات مورد
          نیازشان راه‌اندازی شده است. ما معتقدیم که نیازی نیست همه چیز را
          خریداری کنید، بلکه می‌توانید آن‌ها را در زمان مورد نیاز اجاره کنید.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div
          class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20 transform hover:scale-105 transition-all duration-300"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl text-white">🎯</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">تنوع محصولات</h3>
          <p class="text-gray-600">
            از لوازم خانگی تا تجهیزات ورزشی، همه چیز در یک جا
          </p>
        </div>

        <div
          class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20 transform hover:scale-105 transition-all duration-300"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl text-white">⚡</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">سرعت بالا</h3>
          <p class="text-gray-600">فرآیند اجاره در کمتر از 5 دقیقه</p>
        </div>

        <div
          class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20 transform hover:scale-105 transition-all duration-300"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl text-white">💰</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">صرفه اقتصادی</h3>
          <p class="text-gray-600">صرفه‌جویی تا 70% نسبت به خرید</p>
        </div>

        <div
          class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20 transform hover:scale-105 transition-all duration-300"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl text-white">🛡️</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">ضمانت کیفیت</h3>
          <p class="text-gray-600">همه محصولات تست شده و تضمین شده</p>
        </div>

        <div
          class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20 transform hover:scale-105 transition-all duration-300"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl text-white">🚚</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">تحویل سریع</h3>
          <p class="text-gray-600">تحویل رایگان در سراسر تهران</p>
        </div>

        <div
          class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20 transform hover:scale-105 transition-all duration-300"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl text-white">🎧</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">پشتیبانی 24/7</h3>
          <p class="text-gray-600">پشتیبانی همیشگی برای راحتی شما</p>
        </div>
      </div>

      <!-- Statistics -->
      <div
        class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 mb-16 border border-white/20"
      >
        <h3 class="text-3xl font-bold text-center text-gray-800 mb-8">
          📊 آمار و ارقام
        </h3>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div
              class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2"
            >
              1000+
            </div>
            <div class="text-gray-600">محصول متنوع</div>
          </div>

          <div class="text-center">
            <div
              class="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2"
            >
              5000+
            </div>
            <div class="text-gray-600">مشتری راضی</div>
          </div>

          <div class="text-center">
            <div
              class="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2"
            >
              50+
            </div>
            <div class="text-gray-600">شهر تحت پوشش</div>
          </div>

          <div class="text-center">
            <div
              class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
            >
              99%
            </div>
            <div class="text-gray-600">رضایت مشتریان</div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div
        class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white text-center"
      >
        <h3 class="text-3xl font-bold mb-6">📞 تماس با ما</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="text-2xl mb-2">📱</div>
            <div class="font-semibold mb-1">شماره تماس</div>
            <div>021-12345678</div>
          </div>

          <div>
            <div class="text-2xl mb-2">📧</div>
            <div class="font-semibold mb-1">ایمیل</div>
            <div>info@rentshot.ir</div>
          </div>

          <div>
            <div class="text-2xl mb-2">📍</div>
            <div class="font-semibold mb-1">آدرس</div>
            <div>تهران، خیابان ولیعصر</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
