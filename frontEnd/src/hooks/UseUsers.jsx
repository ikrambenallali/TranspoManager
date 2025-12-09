import { useDispatch, useSelector } from "react-redux";
import { createDriver } from "../features/userSlice.jsx";
import { useEffect } from "react";



export default function UseUsers(driverData) {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (driverData) {
            dispatch(createDriver(driverData));
        }
    }, [dispatch, driverData]);
    return { user, loading, error, };
}
