import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { getSwagger, ReactTestTreeSiteModelMNode } from "./generated";

export enum EQueryKey {
    GET_TREE = 'getTree',
}

const  useGetTree = (treeName: string = 'tree test'): UseQueryResult<ReactTestTreeSiteModelMNode, Error> => {
    return useQuery({
        queryKey: [EQueryKey.GET_TREE],
        queryFn: async (): Promise<ReactTestTreeSiteModelMNode> => {
            const response = await getSwagger().postApiUserTreeGet({ treeName });
            return response;
        },
    });
}

const useCreateNode = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: getSwagger().postApiUserTreeNodeCreate,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [EQueryKey.GET_TREE] }),
        onError: () => alert('something went wrong when colling useCreateNode')
    });
}

const useRenameNode = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: getSwagger().postApiUserTreeNodeRename,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [EQueryKey.GET_TREE] }),
        onError: () => alert('something went wrong when colling useRenameNode')
    });
}

const useDeleteNode = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: getSwagger().postApiUserTreeNodeDelete,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [EQueryKey.GET_TREE] }),
        onError: () => alert('something went wrong when colling useDeleteNode')
    });
}

export { useGetTree, useCreateNode, useRenameNode, useDeleteNode }