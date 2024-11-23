import { Mission, User } from "@prisma/client";
import { InventionCard } from "@/components/invention-card";
import { MissionCard } from "@/components//mission-card";

type MissionWithUsers = Mission & {
    usersCompleted: User[];
} &
{
    usersValidated: User[];
};

interface MissionListProps {
    items: MissionWithUsers[];
    userId: string;
};


export const MissionsList = ({
    items,
    userId
}: MissionListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                {items.map((item) => (
                    <MissionCard 
                        key={item.id}
                        id={item.id}
                        description={item.description}
                        reward={item.reward}
                        usersCompleted = {item.usersCompleted}
                        usersValidated = {item.usersValidated}
                        userId = {userId}
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