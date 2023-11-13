import Skeleton from "@/ui/shared/Skeleton"

const PostCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 p-4 border rounded overflow-hidden">
            <Skeleton className="w-2/3 h-8" />
            <Skeleton className="h-20" />
            <div className="flex ml-auto gap-4">
                <Skeleton className="w-6 h-6" />
                <Skeleton className="w-6 h-6" />
            </div>
        </div>
    )
}

export default PostCardSkeleton