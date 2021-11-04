import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Event } from 'src/event/event';
import { MyMapEvent } from 'src/event/event-pub-sub';
import { MyLogger } from 'src/logger/logger.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostDTO } from './dto/post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('api/post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly logger: MyLogger,
        private readonly eventEmitter: EventEmitter2
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createPost(@Req() req: any, @Body() post: CreatePostDTO) {
        this.logger.debug('userId : ', req.user.userId, ' post : ', post);
        return await this.postService.createPost(req.user.userId, post);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/myPost')
    async readMyPost(@Req() req: any, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
        this.logger.debug('userId : ', req.user.userId, ' page : ', page, ' perPage : ', perPage);
        if (page < 1 || perPage < 1) throw new BadRequestException();
        this.eventEmitter.emit(MyMapEvent.POST_MYLISTED, new Event(req.user.userId, null));
        return await this.postService.readUserPost(req.user.userId, page, perPage);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/savedPost')
    async readSavedPost(@Req() req: any, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
        this.logger.debug('userId : ', req.user.userId, ' page : ', page, ' perPage : ', perPage);
        if (page < 1 || perPage < 1) throw new BadRequestException();
        this.eventEmitter.emit(MyMapEvent.USER_CREATED, new Event(req.user.userId, null))
        return await this.postService.readSavedPost(req.user.userId, page, perPage);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/admin')
    async readPostList(@Query('regionId') regionId: string, @Query('page') page: number = 0, @Query('perPage') perPage: number = 50) {        
        return await this.postService.readPostListInfo(regionId, page, perPage);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:postId')
    async readPost(@Req() req: any, @Param('postId') postId: number) {
        this.logger.debug('userId : ', req.user.userId, 'postId : ', postId);
        const post: PostDTO = await this.postService.readPostDetail(req.user.userId, postId);//savedPost 정보 추가하기
        this.eventEmitter.emit(MyMapEvent.POST_READED, new Event(postId, req.user.userId));
        return post;
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:postId')
    async updatePost(@Req() req: any, @Param('postId') postId:number, @Body() post:UpdatePostDTO) {
        this.logger.debug('userId : ', req.user.userId, ' postId : ', postId, ' post : ', post);
        this.postService.updatePost(req.user.userId, postId, post);
        this.eventEmitter.emit(MyMapEvent.POST_UPDATED, new Event(postId, req.user.userId));
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:postId')
    async deletePost(@Req() req: any, @Param('postId') postId: number) {
        this.logger.debug('userId : ', req.user.userId, ' postId : ', postId)
        this.eventEmitter.emit(MyMapEvent.POST_DELETED, new Event(postId, req.user.userId));
        await this.postService.deletePost(req.user.userId, postId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/savedPost/:postId')
    async savePost(@Req() req: any, @Param('postId') postId: number) {
        this.logger.debug('userId : ', req.user.userId, ' postId : ', postId);
        return await this.postService.savePost(req.user.userId, postId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/savedPost/:postId')
    async deleteSavedPost(@Req() req: any, @Param('postId') postId: number) {
        this.logger.debug('userId : ', req.user.userId, ' postId : ', postId);
        this.eventEmitter.emit(MyMapEvent.POST_UNSAVED, new Event(req.user.userId, postId));
        await this.postService.deleteSavedPost(req.user.userId, postId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/feed/:regionId')
    async readRegionPost(@Req() req: any, @Param('regionId') regionId: string, @Query('start') start: number = 0, @Query('end') end: number = 0, @Query('perPage') perPage: number = 10) {
        this.logger.debug('userId : ', req.user.userId, 'regionId : ', regionId, 'start : ', start, 'end : ', end, 'perPage : ', perPage)
        if (start < 0 || end < 0 || perPage < 1) throw new BadRequestException();
        this.eventEmitter.emit(MyMapEvent.POST_LISTED, new Event(null, regionId));
        return await this.postService.readRegionPost(req.user.userId, regionId, start, end, perPage);
    }
}
