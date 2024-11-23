import { Category, Invention, User } from "@prisma/client";
import { InventionCard } from "@/components/invention-card";

type InventionWithCategoryWithUser = Invention & {
    category: Category | null;
} & {
    user: User | null;
} ;

interface InventionListProps {
    items: InventionWithCategoryWithUser[];
};

export const InventionList = ({
    items
}: InventionListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <InventionCard 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        category={item?.category?.name!}
                        isPublished={item.isPublished}
                        isValidated={item.isValidated}
                        authorId = {item.userId}
                        authorFirstName = {item.user?.firstName!}
                        authorLastName = {item.user?.lastName!}
                    />
                ))}
            </div>
            {items.length === 0 && (
               <div className="text-center text-sm text-muted-foreground mt-10">
                    No inventions found
                </div> 
            )}
        </div>
    )
}