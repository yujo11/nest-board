import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return board;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const board: Board = {
      id: uuid(),
      ...createBoardDto,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);

    return board;
  }

  deleteBoard(id: string): void {
    this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);

    board.status = status;

    return board;
  }
}
