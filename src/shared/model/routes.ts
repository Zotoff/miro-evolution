import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  BOARDS: "/boards",
  BOARD: "/boards/:boardId",
} as const;

// названия параметров
export type PathParams = {
  [ROUTES.BOARD]: {
    boardId: string;
  };
};

// переопределяем интерфейс регистер в react-router-dom
declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
