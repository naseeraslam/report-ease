import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto py-8 px-6">
                <Outlet /> {/* Child routes will be rendered here */}
            </main>
        </div>
    );
};

export default Layout;