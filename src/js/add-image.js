/* eslint-disable func-names */
/* eslint-disable object-shorthand */
import { Dropzone } from 'dropzone'

/* .image is the id of the form in the view add-image */
Dropzone.options.image = {
  dictDefaultMessage: 'Sube tus imágenes aquí',
  acceptedFiles: '.jpeg,.jpg,.png,.gif',
  maxFilesize: 5, // MB
  maxFiles: 1, // Max number of files
  parallelUploads: 1, // Max number of simultaneous uploads
  autoProcessQueue: false, // Don't automatically process the files
  addRemoveLinks: true, // Allow users to remove files
  dictRemoveFile: 'Eliminar',
  // dictMaxFilesExceeded: 'No puedes subir más de 5 imágenes',
  dictMaxFilesExceeded: 'No puedes subir más de 1 imagen',
  paramName: 'image', // The name that will be used to transfer the file
  init: function () {
    const dropzone = this
    const btnPublish = document.querySelector('#publish')

    btnPublish.addEventListener('click', () => {
      dropzone.processQueue()
    })

    dropzone.on('error', (file, message) => {
      console.log(message)
    })

    dropzone.on('queuecomplete', () => {
      if (dropzone.getActiveFiles().length === 0) {
        window.location.href = '/my-properties'
      }
    })
  },
}
