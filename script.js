// اختفاء شاشة التحميل بعد ثلاث ثوانٍ
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('splash-screen').style.display = 'none';
    }, 3000); // 3000 ميلي ثانية = 3 ثوانٍ
});

// مصفوفة لتخزين الملفات المختارة
let selectedFiles = [];

// التعامل مع نموذج الرفع
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (selectedFiles.length === 0) {
        alert('No files selected');
        return;
    }
    
    let formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files[]', selectedFiles[i]);
    }
    formData.append('modifications', document.getElementById('modifications').value);

    fetch('http://localhost:5000/upload', {  
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        saveProject(selectedFiles, document.getElementById('modifications').value);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// عرض الملفات المختارة
document.getElementById('videoFile').addEventListener('change', function(event) {
    const newFiles = Array.from(event.target.files); // تحويل قائمة الملفات إلى مصفوفة
    selectedFiles = selectedFiles.concat(newFiles);  // دمج الملفات الجديدة مع الملفات المختارة

    // تحديث المعاينة
    updatePreview();
});

// دالة لتحديث المعاينة
function updatePreview() {
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = ''; // تفريغ الحاوية قبل العرض

    selectedFiles.forEach(file => {
        const fileType = file.type;

        if (fileType.startsWith('image/')) {
            // إذا كان الملف صورة
            const imgElement = document.createElement('img');
            imgElement.src = URL.createObjectURL(file);
            imgElement.style.maxWidth = '200px';  // ضبط عرض الصورة
            imgElement.style.margin = '10px';    // مسافة بين الصور
            previewContainer.appendChild(imgElement);
        } else if (fileType.startsWith('video/')) {
            // إذا كان الملف فيديو
            const videoElement = document.createElement('video');
            videoElement.src = URL.createObjectURL(file);
            videoElement.controls = true;  // إضافة عناصر التحكم بالفيديو
            videoElement.style.maxWidth = '200px';  // ضبط عرض الفيديو
            videoElement.style.margin = '10px';    // مسافة بين الفيديوهات
            previewContainer.appendChild(videoElement);
        }
    });
}

// تخزين المشروع في localStorage
function saveProject(files, modifications) {
    const project = {
        date: new Date().toLocaleString(),
        files: files.map(file => file.name),
        modifications: modifications
    };
    
    // الحصول على المشاريع المخزنة
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
}