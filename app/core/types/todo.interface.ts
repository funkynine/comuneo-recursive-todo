export interface Todo {
    $id: string;
    $sequence: number;
    $collectionId:string;
    $databaseId: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    title: string;
    completed: boolean;
    parentId: string | null | "";
    ownerId: string;
}
