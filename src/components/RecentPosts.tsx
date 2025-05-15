import { TextLG, TextMD } from './Typography';

interface PostCardProps {
    title: string;
    location: string;
    description: string;
    date: string;
}

export const PostCard = ({ title, location, description, date }: PostCardProps) => {
    return (
        <div className="border border-[#EAECF0] rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-8">
                {/* Card content */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <TextLG
                            weight="semibold"
                            className="text-[#101828]"
                        >
                            {title}
                        </TextLG>
                        <span className="bg-white text-[#344054] text-sm font-medium border border-[#D0D5DD] rounded-md px-2 py-0.5 shadow-sm">
                            {location}
                        </span>
                    </div>
                    <TextMD className="text-[#475467]">
                        {description}
                    </TextMD>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0001 5.00033V10.0003L13.3334 11.6670M18.3334 10.0003C18.3334 14.6027 14.6025 18.3337 10.0001 18.3337C5.39771 18.3337 1.66675 14.6027 1.66675 10.0003C1.66675 5.39795 5.39771 1.66699 10.0001 1.66699C14.6025 1.66699 18.3334 5.39795 18.3334 10.0003Z" stroke="#98A2B3" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <TextMD className="text-[#475467] font-medium">
                        {date}
                    </TextMD>
                </div>
            </div>
        </div>
    );
};

interface RecentPostsProps {
    posts: PostCardProps[];
}

export const RecentPosts = ({ posts }: RecentPostsProps) => {
    return (
        <div className="grid gap-6">
            {posts.map((post, index) => (
                <PostCard
                    key={index}
                    title={post.title}
                    location={post.location}
                    description={post.description}
                    date={post.date}
                />
            ))}
        </div>
    );
};