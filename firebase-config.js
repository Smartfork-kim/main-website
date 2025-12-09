// Firebase 설정 및 초기화

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyA2AnJWSAfqUqZ50eX0FREoOob13OWMWjk",
  authDomain: "smartwebsite2025.firebaseapp.com",
  projectId: "smartwebsite2025",
  storageBucket: "smartwebsite2025.firebasestorage.app",
  messagingSenderId: "769239050788",
  appId: "1:769239050788:web:a2b508a423f26546c406b1",
  measurementId: "G-CWVJL0XBP1"
};

// Firebase 초기화
const app = firebase.initializeApp(firebaseConfig);

// Firebase 서비스 초기화 (smartfork 데이터베이스 사용)
const db = firebase.app().firestore();
// Firestore 설정
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

const storage = firebase.storage();
const auth = firebase.auth();

console.log('✅ Firebase 초기화 완료 (smartfork 데이터베이스)');

