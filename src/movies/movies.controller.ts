import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchYear: string) {
    return `We are searching for a movie made after ${searchYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with the id of ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return 'This will create a movie';
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    return `This will remove a movie with the id of ${movieId}`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
