import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.enum.model';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardData: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardData);
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne(id);

    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return board;
  }

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
