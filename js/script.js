"use strict"

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append('image', formImage.files[0]);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sendig');
      } else {
        alert('Ошибка');
        form.classList.remove('_sendig');
      }
    } else {
      alert('Заполните обязательные поля');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReg = document.querySelectorAll('._reg')

    for (let index = 0; index < formReg.length; index++) {
      const input = formReg[index];
      formRemoveError(input);

      if (input.classList.contains('_phone')) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  function phoneTest(input) {
    return !/^\d[\d\(\)\ -]{4,14}\d$/.test(input.value);
  }
  //получаем инпут-файл в переменную:
  const formImage = document.getElementById('formImage')
  //Получаем див для превью в переменную
  const formPreview = document.getElementById('formPreview')
  //Слшаем изменения в инпуте file
  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    //проверяем тип файла
    // if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/doc', 'image/pdf', 'image/txt', 'image/xls', 'image/docx', 'imaget.vsd'].includes(file.type)) {
    //   alert('Разрешены только изображения и документы.');
    //   formImage.value = '';
    //   return;
    // }
    //Проверяем размер файла (< 10 Mb)
    if (file.size > 10 * 1024 * 1024) {
      alert('Файл должен быть менее 10 Мб.');
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      formPreview.innerHTML = `<img scr="${e.target.result}" alt="Файл загружен">`;
    };
    reader.onerror = function (e) {
      alert('Ошибка');
    };
    reader.readAsDataURL(file);
  }

});