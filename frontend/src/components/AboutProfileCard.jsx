'use client';
import { useProfile } from '@/context/ProfileContext';

export default function AboutProfileCard() {
    const { profileImageUrl } = useProfile();
    return (
        <div className="relative w-36 h-36 mx-auto rounded-3xl p-1 btn-gradient shadow-xl">
            <img
                src={profileImageUrl}
                alt="Sweta Pandey"
                className="w-full h-full rounded-2xl object-cover object-top bg-slate-100"
            />
        </div>
    );
}
