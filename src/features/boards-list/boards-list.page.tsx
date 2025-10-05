import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { useQueryClient } from "@tanstack/react-query";
import { Link, href } from "react-router-dom";

function BoardsListPage() {
  const queryClient = useQueryClient();
  const boardsQuery = rqClient.useQuery("get", "/boards");

  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
  });

  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  if (!boardsQuery.isSuccess) {
    return null;
  }

  return (
    <div>
      <h1>Boards list</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          createBoardMutation.mutate({
            body: {
              name: formData.get("name") as string,
            },
          });
        }}
      >
        <input name="name" type="text" placeholder="Name" />
        <input type="text" placeholder="Description" />
        <button disabled={createBoardMutation.isPending}>
          Create new board
        </button>
      </form>
      {boardsQuery.data?.map((board) => (
        <Card key={board.id}>
          <CardHeader>
            <Button asChild variant="link">
              <Link
                to={href(ROUTES.BOARD, { boardId: board.id })}
                key={board.id}
              >
                {board.name}
              </Link>
            </Button>
          </CardHeader>
          <CardFooter>
            <Button
              variant="destructive"
              disabled={deleteBoardMutation.isPending}
              onClick={() => {
                deleteBoardMutation.mutate({
                  params: { path: { boardId: board.id } },
                });
              }}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export const Component = BoardsListPage;
