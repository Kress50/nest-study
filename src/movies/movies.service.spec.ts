import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { serialize } from 'v8';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genre: ['test'],
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
    });
    it('should throw 404', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie from an array', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genre: ['test'],
      });
      service.deleteOne(1);
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toEqual(0);
    });
    it('should throw 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2022,
        genre: ['test'],
      });
      const result = service.getAll().length;
      expect(result).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genre: ['test'],
      });
      service.update(1, { title: 'Test Movie 2' });
      const result = service.getOne(1);
      expect(result.title).toEqual('Test Movie 2');
    });
    it('should throw 404', () => {
      try {
        service.update(222, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
