import { toast } from 'react-toastify';

export const handlerError = (error, history) => {
    if (error.response) {
        if (error.response.status === 401) {
            localStorage.clear();
            history.push('/login');
        }
        if (error.response.data.error) {
            error.response.data.errors.forEach((e) => {
                toast.error(e.message);
            });
        }
        return error.response.data.errors;
    } else {
        toast.error("Some thing was wrong!");
        console.log(error);
        return [
            {
                code: 9999,
                message: "Some thing was wrong!"
            }
        ];
    }
}