import Swal, { SweetAlertIcon } from 'sweetalert2';

export const showAlert = (
  titleText = 'Something happened.',
  alertType?: SweetAlertIcon
): void => {
  Swal.fire({
    titleText,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true,
    toast: true,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: 'Dismiss',
    icon: alertType,
    showClass: {
      popup: 'swal2-noanimation',
      backdrop: 'swal2-noanimation',
    },
    hideClass: {
      popup: '',
      backdrop: '',
    },
  });
};
// This file exports a function that displays a toast whenever it is invoked. 
// The function accepts parameters to allow you set the toast message and type. For example, 
// we are showing an error toast in the Axios response error interceptor like this: