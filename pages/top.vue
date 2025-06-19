<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-3xl font-bold text-indigo-900">
                🏨 ホテル予約管理システム
              </h1>
            </div>
          </div>
          <nav class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a href="#" class="text-indigo-600 hover:text-indigo-900 px-3 py-2 rounded-md text-sm font-medium">
                ダッシュボード
              </a>
              <NuxtLink to="/reservations" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                予約管理
              </NuxtLink>
              <a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                客室管理
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                レポート
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Welcome Section -->
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="text-center">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">
                ホテル予約管理システムへようこそ
              </h2>
              <p class="text-lg text-gray-600 mb-8">
                効率的な予約管理でお客様に最高のサービスを提供しましょう
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="text-2xl">📅</div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      本日の予約
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ todayReservations }}件
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="text-2xl">🛏️</div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      利用可能客室
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ availableRooms }}室
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="text-2xl">👥</div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      チェックイン待ち
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ pendingCheckins }}名
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="text-2xl">💰</div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      今月の売上
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      ¥{{ monthlyRevenue.toLocaleString() }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              クイックアクション
            </h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="handleNewReservation"
              >
                新規予約登録
              </button>
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="handleCheckIn"
              >
                チェックイン処理
              </button>
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="handleCheckOut"
              >
                チェックアウト処理
              </button>
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="handleRoomStatus"
              >
                客室状況確認
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              最近の活動
            </h3>
            <div class="flow-root">
              <ul role="list" class="-my-5 divide-y divide-gray-200">
                <li v-for="activity in recentActivities" :key="activity.id" class="py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <span class="text-lg">{{ activity.icon }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{ activity.title }}
                      </p>
                      <p class="text-sm text-gray-500 truncate">
                        {{ activity.description }}
                      </p>
                    </div>
                    <div class="flex-shrink-0 text-sm text-gray-500">
                      {{ activity.time }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// TypeScript interface definitions
interface Activity {
  id: number;
  icon: string;
  title: string;
  description: string;
  time: string;
}

// Page meta
definePageMeta({
  title: 'ホテル予約管理システム - トップページ'
});

// Reactive data
const todayReservations = ref<number>(12);
const availableRooms = ref<number>(25);
const pendingCheckins = ref<number>(8);
const monthlyRevenue = ref<number>(2850000);

const recentActivities = ref<Activity[]>([
  {
    id: 1,
    icon: '📝',
    title: '新規予約が登録されました',
    description: '田中様 - スイートルーム (2泊3日)',
    time: '10分前'
  },
  {
    id: 2,
    icon: '✅',
    title: 'チェックイン完了',
    description: '佐藤様 - デラックスルーム 203号室',
    time: '30分前'
  },
  {
    id: 3,
    icon: '🧹',
    title: '客室清掃完了',
    description: 'スタンダードルーム 105号室',
    time: '1時間前'
  },
  {
    id: 4,
    icon: '💳',
    title: '決済処理完了',
    description: '山田様 - ¥45,000',
    time: '2時間前'
  }
]);

// Methods
const handleNewReservation = (): void => {
  alert('新規予約登録画面に遷移します');
};

const handleCheckIn = (): void => {
  alert('チェックイン処理画面に遷移します');
};

const handleCheckOut = (): void => {
  alert('チェックアウト処理画面に遷移します');
};

const handleRoomStatus = (): void => {
  alert('客室状況確認画面に遷移します');
};

// Head configuration
useHead({
  title: 'ホテル予約管理システム - トップページ',
  meta: [
    { name: 'description', content: 'ホテル予約管理システムのメインダッシュボードページです。予約状況、客室状況、売上情報を一目で確認できます。' }
  ]
});
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
/* Additional custom styles can be added here if needed */
</style>