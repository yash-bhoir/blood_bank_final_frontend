import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ResponseResult, ToastDisplayType, ToastType } from "../../interface/CommonTypes";

export function useAuthFetch<T>(initial: T, toastDisplayType: ToastDisplayType = ToastDisplayType.None, toastMessage?: (type: ToastType) => string,): [T, (input: RequestInfo | URL, init?: RequestInit,) => void] {

    const [data, setData] = useState<T>(initial);
    const [status, setStatus] = useState<boolean | null>(null);
    const [toastId, setToastId] = useState<string | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        if (status != null) {
            if (toastDisplayType !== ToastDisplayType.None && status) {
                if (toastDisplayType == ToastDisplayType.Custom && toastMessage)
                    toast.success(toastMessage(ToastType.Success), { id: toastId });
                else {
                    if ((data as ResponseResult).status)
                        toast.success((data as ResponseResult).status, { id: toastId });
                    else
                        toast.success("Process Successful", { id: toastId });
                }
            }
            else if (toastDisplayType !== ToastDisplayType.None && status == false) {
                if (toastDisplayType == ToastDisplayType.Custom && toastMessage)
                    toast.error(toastMessage(ToastType.Error), { id: toastId });
                else {
                    if ((data as ResponseResult).status)
                        toast.error((data as ResponseResult).status, { id: toastId });
                    else
                        toast.error("Something went Wrong", { id: toastId });
                }

            }

            setStatus(null);
        }

    }, [status]);

    return [data, async function (input: RequestInfo | URL, init?: RequestInit,) {

        if (toastDisplayType != ToastDisplayType.None) {
            if (toastDisplayType == ToastDisplayType.Custom && toastMessage)
                setToastId(toast.loading(toastMessage(ToastType.Loading)));
            else
                setToastId(toast.loading("Processing.."));
        }
        if (init?.headers) {
            init.headers = {
                ...init.headers, 'Authorization': `Bearer ${Cookies.get('accessToken')}`
            };
        }
        else if (!init) {
            init = { headers: { 'Authorization': `Bearer ${Cookies.get('accessToken')}` } };
        } else {
            init = { ...init, headers: { 'Authorization': `Bearer ${Cookies.get('accessToken')}` } };
        }
        const response = await fetch(input, init);

        if (response.status == 401) {
            toast.remove();
            Cookies.remove('accessToken');
            navigate('/signin');
        }
        if (response.status == 403) {
            toast.remove();
            toast.error((await response.json() as ResponseResult).status)
        }
        else {

            setData(await response.json() as T);
            setStatus(response.ok ? true : false);

        }

    }];
}
