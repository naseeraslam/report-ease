import axios from 'axios';
import authService from './authService';
import { UserListDto } from '../types/auth.types';

const API_URL = '/api/admin/';

const getUsers = () => {
    const user = authService.getCurrentUser();
    return axios.get<UserListDto[]>(API_URL + 'users', {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        }
    });
};

const updateUserRole = (userId: string, roleName: string) => {
    const user = authService.getCurrentUser();
    return axios.post(API_URL + 'update-role', {
        userId,
        roleName
    }, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        }
    });
};

const adminService = {
    getUsers,
    updateUserRole,
};

export default adminService;