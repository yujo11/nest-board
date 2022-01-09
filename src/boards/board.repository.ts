import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum.model';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardData: CreateBoardDto): Promise<Board> {
    const board = this.create({
      ...createBoardData,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}
