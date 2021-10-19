import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MyLogger } from 'src/logger/logger.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('api/post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly logger: MyLogger
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createPost(@Req() req: any, @Body() post: CreatePostDTO) {
        this.logger.debug('userId : ', req.user.userId, ' post : ', post);
        await this.postService.createPost(req.user.userId, post);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/myPost')
    async readMyPost(@Req() req: any, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
        this.logger.debug('userId : ', req.user.userId, ' page : ', page, ' perPage : ', perPage);
        if (page < 1 || perPage < 1) throw new BadRequestException();
        return await this.postService.readUserPost(req.user.userId, page, perPage);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/savedPost')
    async readSavedPost(@Req() req: any, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
        this.logger.debug('userId : ', req.user.userId, ' page : ', page, ' perPage : ', perPage);
        if (page < 1 || perPage < 1) throw new BadRequestException();
        return await this.postService.readSavedPost(req.user.userId, page, perPage);
    }

    @Get('/:postId')
    async readPost(@Param('postId') postId: number) {
        this.logger.debug('postId : ', postId);
        return await this.postService.readPost(postId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:postId')
    async updatePost(@Req() req: any, @Param('postId') postId:number, @Body() post:UpdatePostDTO) {
        this.logger.debug('userId : ', req.user.userId, ' postId : ', postId, ' post : ', post);
        this.postService.updatePost(req.user.userId, postId, post);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:postId')
    async deletePost(@Req() req: any, @Param('postId') postId: number) {
        this.logger.debug('userId : ', req.user.userId, ' postId : ', postId)
        await this.postService.deletePost(req.user.userId, postId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/savedPost/:postId')
    async savePost(@Req() req: any, @Param('postId') postId: number) {
        this.logger.debug('userId : ', req.user.userId, ' postId : ', postId);
        return await this.postService.savePost(req.user.userId, postId);
    }

    @Get('/feed/:regionId')
    async readRegionPost(@Param('regionId') regionId: string, @Query('start') start: number = 0, @Query('end') end: number = 0, @Query('perPage') perPage: number = 10) {
        this.logger.debug('regionId : ', regionId, 'start : ', start, 'end : ', end, 'perPage : ', perPage)
        if (start < 0 || end < 0 || perPage < 1) throw new BadRequestException();
        return await this.postService.readRegionPost(regionId, start, end, perPage);
    }

}
