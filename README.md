# 🏫 Classroom Management System

Hệ thống quản lý lớp học trực tuyến dành cho Giảng viên (Instructor) và Học viên (Student), tích hợp xác thực OTP qua SMS/Email, liên kết kích hoạt tài khoản và Chat thời gian thực.

---

## 🛠 Công nghệ sử dụng

### **Frontend**

- **Framework:** React.js (Vite)
- **UI Library:** Ant Design (`antd`), Ant Design Icons
- **Routing:** React Router DOM
- **HTTP Client:** Axios

### **Backend**

- **Runtime:** Node.js (Express.js)
- **Real-time:** Socket.IO
- **Deployment:** Render (`https://classroom-management-bg6r.onrender.com`)

---

## 🚀 Tính năng chính

- 🔐 **Xác thực người dùng:**
  - Đăng nhập qua **Mã xác nhận 6 số (OTP)** gửi về Số điện thoại (SMS) hoặc Email.
  - **Thiết lập tài khoản (Setup Account):** Học viên kích hoạt tài khoản và đặt mật khẩu qua liên kết gửi từ Email.
- 👨‍🏫 **Phân quyền người dùng:**
  - **Giảng viên (Instructor):** Quản lý lớp học, bài học, lịch giảng dạy.
  - **Học viên (Student):** Theo dõi khóa học, tham gia bài học.
- 💬 **Tương tác thời gian thực:**
  - Trò chuyện trực tiếp (Chat) trong lớp học bằng Socket.IO.

---

## 📂 Cấu trúc dự án

```text
classroom-management/
├── backend/
│   ├── modules/
│   │   ├── auth/          # Xử lý xác thực, cấp OTP, Setup Account
│   │   ├── user/          # Quản lý người dùng
│   │   └── lesson/        # Quản lý bài học
│   ├── socket/            # Cấu hình Socket.IO
│   ├── index.js           # Entry point Express Server
│   └── package.json
│
└── frontend/
    └── src/
        ├── api/           # Khai báo các API service (Axios instance, authApi, lessonApi...)
        ├── components/    # Các UI Component dùng chung (ProtectedRoute, Loading, Modal...)
        ├── hooks/         # Custom Hooks (useAuth, useSocket...)
        ├── layouts/       # Khung giao diện chính (MainLayout, InstructorLayout, StudentLayout...)
        ├── pages/         # Các trang chính (Login, SetupAccount, Dashboard, Lessons...)
        ├── utils/         # Hàm tiện ích trợ giúp (formatDate, storage, helpers...)
        └── App.jsx        # Root Component & Định tuyến (Routing)
```

## ⚙️ Cài đặt & Chạy dự án

### 1. Yêu cầu môi trường

- **Node.js:** `>= 20`
- **npm:** đi kèm Node.js
- **Git:** dùng để clone source code

### 2. Clone repository

```bash
git clone https://github.com/tainguyen04/Classroom-Management.git
cd Classroom-Management
```

### 3. Cài đặt Backend

Di chuyển vào thư mục backend:

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend`:

```env
PORT=3000

# Firebase Firestore
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="your_private_key"

# Các biến môi trường khác nếu có
```

> Các giá trị Firebase được lấy từ **Firebase Service Account**. Không chia sẻ hoặc commit `FIREBASE_PRIVATE_KEY` lên GitHub.

Sau đó chạy Backend:

```bash
npm start
```

Backend mặc định chạy tại:

```text
http://localhost:3000
```

### 4. Cấu hình Firebase Firestore

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Chọn project của hệ thống.
3. Vào **Project Settings → Service accounts**.
4. Chọn **Generate new private key** để tạo Service Account Key.
5. Sử dụng thông tin trong file JSON được tải xuống để cấu hình các biến môi trường.
6. Khi deploy trên Render, thêm các biến này vào **Environment Variables** của service.

> ⚠️ File Service Account JSON và private key là thông tin nhạy cảm. Không commit file JSON hoặc private key vào GitHub.

### 4. Cài đặt Frontend

Mở terminal mới và di chuyển vào thư mục frontend:

````bash
cd frontend
npm install

Chạy Frontend:

```bash
npm run dev
````

Frontend sẽ được chạy tại địa chỉ mà Vite hiển thị trong terminal, thường là:

```text
http://localhost:5173
```

### 5. Chạy Backend và Frontend

Cần chạy đồng thời hai service:

**Terminal 1 – Backend:**

```bash
cd backend
npm start
```

**Terminal 2 – Frontend:**

```bash
cd frontend
npm run dev
```

### 6. Deployment Frontend

Frontend được deploy trên **Render** dưới dạng **Static Site**.

**Root Directory:**

```text
frontend
```

**Build Command:**

```bash
npm install && npm run build
```

**Publish Directory:**

```text
dist
```

Frontend không sử dụng Environment Variables.

Backend API được cấu hình trực tiếp trong source code và sử dụng:

```text
https://classroom-management-fe.onrender.com
```

Nếu sử dụng React Router, cấu hình Rewrite Rule trên Render:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

### 7. Deployment Backend

Backend được deploy trên **Render** dưới dạng **Web Service**.

**Build Command:**

```bash
npm install
```

**Start Command:**

```bash
npm start
```

Backend:

```text
https://classroom-management-bg6r.onrender.com
```

Các thông tin nhạy cảm như Firebase Secret Key, Email credentials và các secret khác được cấu hình trong **Render → Environment Variables**, không lưu trực tiếp trong source code.
