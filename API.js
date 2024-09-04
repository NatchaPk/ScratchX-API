(function(ext) {
    // กำหนดค่าพื้นฐานให้กับ Extension
    ext._shutdown = function() {};
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // สร้างฟังก์ชันเพื่อดึงข้อมูลจาก API
    ext.getAPIData = function(apiUrl, callback) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // ส่งข้อมูลที่ได้รับกลับไปยัง Scratch
                callback(data.result); // สมมุติว่า JSON ที่ได้จาก API มี key ชื่อ 'result'
            })
            .catch(error => {
                console.error('Error fetching API:', error);
                callback("Error");
            });
    };

    // กำหนด block ที่จะใช้งานใน Scratch
    var descriptor = {
        blocks: [
            ['R', 'get data from %s', 'getAPIData', 'https://api.example.com/data'],
        ]
    };

    // ลงทะเบียน Extension กับ Scratch
    ScratchExtensions.register('API Data Extension', descriptor, ext);
})();

