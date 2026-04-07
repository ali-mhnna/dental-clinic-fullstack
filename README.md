# 🦷 Dental Clinic Website

موقع إلكتروني متكامل لعيادة أسنان يتيح للمرضى حجز المواعيد وتلقي الإشعارات عند تأكيد موعدهم.

A full-stack dental clinic website that allows patients to book appointments and receive notifications when confirmed.

---

##  التقنيات المستخدمة | Technologies

### Backend
- Laravel 12
- Laravel Sanctum (Authentication)
- MySQL Database
- RESTful API

### Frontend
- React 18
- Redux Toolkit (State Management)
- React Bootstrap
- Axios
- React Router DOM

---

##  المتطلبات | Requirements

- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL

---

##  التثبيت والتشغيل | Installation

### 1️⃣ Backend Setup

```bash
# استنساخ المشروع
git clone <repository-url>
cd dental-clinic-backend

# تثبيت المكتبات
composer install

# نسخ ملف البيئة
cp .env.example .env

# إنشاء مفتاح التطبيق
php artisan key:generate

# إعداد قاعدة البيانات في .env
DB_CONNECTION=mysql
DB_DATABASE=dental_clinic
DB_USERNAME=root
DB_PASSWORD=

# تنفيذ الـ Migrations
php artisan migrate

# إنشاء حساب الأدمن
php artisan db:seed --class=AdminSeeder

# تشغيل السيرفر
php artisan serve

------------------------------------------------------

 2️⃣ Frontend Setup

 # الانتقال لمجلد Frontend
cd dental-clinic-frontend

# تثبيت المكتبات
npm install

# تشغيل المشروع
npm start

-------------------------------------------------------
 هيكل المشروع | Project Structure

 dental-clinic/
├── dental-clinic-backend/    # Laravel API
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
└── dental-clinic-frontend/   # React App
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── redux/
    │   └── services/
    └── ...

     المميزات | Features
✅ نظام حجز المواعيد للمرضى
✅ لوحة تحكم للمستخدم لمتابعة المواعيد
✅ لوحة تحكم للأدمن لإدارة المواعيد
✅ نظام إشعارات فوري
✅ تصميم متجاوب (Responsive)
✅ مصادقة آمنة (Laravel Sanctum)
✅ إدارة الحالة باستخدام Redux



 الصلاحيات | Roles
User (مستخدم)
حجز موعد
عرض مواعيده
استقبال الإشعارات

Admin (أدمن)
عرض جميع المواعيد
تحديد مواعيد للمرضى
حذف/تعديل المواعيد
إرسال إشعارات تلقائية

