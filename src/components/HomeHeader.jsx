import ProfileIcon from "./ProfileIcon";

const HomeHeader = () => {
    return (
        <header className="h-16 flex justify-between  items-center gap-4 px-5 border-b border-[#e0e0e0]">
            <div className="flex gap-4">
                <span className="text-black/[0.87] text-[13px] line-height hover:underline cursor-pointer">
                  About 
                </span>
                <span className="text-black/[0.87] text-[13px] line-height hover:underline cursor-pointer">
                   Store
                </span>
            </div>

            <ProfileIcon />
        </header>
    );
};

export default HomeHeader;
