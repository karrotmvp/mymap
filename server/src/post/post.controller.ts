import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EventEmitter2 } from 'eventemitter2';
import { catchError } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Event } from 'src/event/event';
import { MyMapEvent } from 'src/event/event-pub-sub';
import { MyLogger } from 'src/logger/logger.service';
import { UserService } from 'src/user/user.service';
import { CreatePinDTO } from './dto/create-pin.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { FeedDTO } from './dto/feed.dto';
import { PostDTO } from './dto/post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { PostService } from './post.service';

@ApiTags('api/post')
@Controller('api/post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService,
        private readonly logger: MyLogger,
        private readonly eventEmitter: EventEmitter2
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/myPost')
    @ApiOkResponse({ description: '내 테마 불러오기 성공', type: FeedDTO })
    @ApiQuery({ name: 'page', example: 1 })
    @ApiQuery({ name: 'perPage', example: 10 })
    @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    async readMyPost(@Req() req: any, @Query('page') page: number, @Query('perPage') perPage: number): Promise<FeedDTO> {
        this.logger.debug('userId : ', req.user.userId, ' page : ', page, ' perPage : ', perPage);
        if (!page && !perPage) return new FeedDTO(await this.postService.readUserPostInfo(req.user.userId), null);
        if (page < 1 || perPage < 1) throw new BadRequestException();
        this.eventEmitter.emit(MyMapEvent.POST_MYLISTED, new Event(req.user.userId, null));
        return await this.postService.readUserPost(req.user.userId, page, perPage);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/savedPost')
    @ApiOkResponse({ description: '저장한 테마 불러오기 성공', type: FeedDTO })
    @ApiQuery({ name: 'page', example: 1 })
    @ApiQuery({ name: 'perPage', example: 10 })
    @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    async readSavedPost(@Req() req: any, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10): Promise<FeedDTO> {
        this.logger.debug('userId : ', req.user.userId, ' page : ', page, ' perPage : ', perPage);
        if (page < 1 || perPage < 1) throw new BadRequestException();
        this.eventEmitter.emit(MyMapEvent.POST_SAVELISTED, new Event(req.user.userId, null))
        return await this.postService.readSavedPost(req.user.userId, page, perPage);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/admin')
    async readPostList(@Req() req: any, @Query('regionId') regionId: string, @Query('page') page: number = 0, @Query('perPage') perPage: number = 20) {
        await this.userService.checkAdmin(req.user.userId);
        return await this.postService.readPostListInfo(regionId, page, perPage);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:postId')
    @ApiOkResponse({ description: '테마 불러오기 성공', type: PostDTO })
    @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    async readPost(@Req() req: any, @Param('postId') postId: number): Promise<PostDTO> {
        this.logger.debug('userId : ', req.user.userId, 'postId : ', postId);
        const post: PostDTO = await this.postService.readPostDetail(req.user.userId, postId);
        this.eventEmitter.emit(MyMapEvent.POST_READED, new Event(postId, req.user.userId));
        return post;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/feed/:regionId')
    @ApiOkResponse({ description: '피드 불러오기 성공', type: FeedDTO })
    @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    @ApiQuery({ name: 'start', example: 10, description: '지금까지 불러온 가장 최근 테마 ID' })
    @ApiQuery({ name: 'end', example: 1, description: '지금까지 불러온 가장 오래된 테마 ID' })
    @ApiQuery({ name: 'perPage', example: 10 })
    @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    async readRegionPost(@Req() req: any, @Param('regionId') regionId: string, @Query('start') start: number = 0, @Query('end') end: number = 0, @Query('perPage') perPage: number = 10): Promise<FeedDTO> {
        this.logger.debug('userId : ', req.user.userId, 'regionId : ', regionId, 'start : ', start, 'end : ', end, 'perPage : ', perPage)
        if (start < 0 || end < 0 || perPage < 1) throw new BadRequestException();
        this.eventEmitter.emit(MyMapEvent.POST_LISTED, new Event(null, regionId));
        return await this.postService.readRegionPost(req.user.userId, regionId, start, end, perPage);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createPost(@Req() req: any, @Body() post: CreatePostDTO) {
        this.logger.debug('userId : ', req.user.userId, ' post : ', post);
        return await this.postService.createPost(req.user.userId, post);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/savedPost/:postId')
    async savePost(@Req() req: any, @Param('postId') postId: number) {
        this.logger.debug('userId : ', req.user.userId, ' postId : ', postId);
        return await this.postService.savePost(req.user.userId, postId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/pin')
    @ApiOkResponse({ description: '핀 추가 성공' })
    @ApiQuery({ name: 'postId', example: '[1, 2, 3]', description: '핀 추가할 테마 Id' })
    @ApiBody({ type: CreatePinDTO })
    @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    async addPin(@Req() req: any, @Query('postId') postIds: number[], @Body() pin: CreatePinDTO) {
        const promise = postIds.map(async(postId) => {
            return await this.postService.addPin(req.user.userId, Number(postId), pin);
        })
        await Promise.all(promise);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:postId')
    async updatePost(@Req() req: any, @Param('postId') postId:number, @Body() post:UpdatePostDTO) {
        this.logger.debug('userId : ', req.user.userId, ' postId : ', postId, ' post : ', post);
        this.eventEmitter.emit(MyMapEvent.POST_UPDATED, new Event(postId, req.user.userId));
        return await this.postService.updatePost(req.user.userId, postId, post);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/share/:postId')
    @ApiOkResponse({ description: '테마 공개 여부 변경 성공' })
    @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    async updatePostShare(@Req() req: any, @Param('postId') postId: number) {
        await this.postService.updatePostShare(req.user.userId, postId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:postId')
    async deletePost(@Req() req: any, @Param('postId') postId: number) {
        this.logger.debug('userId : ', req.user.userId, ' postId : ', postId)
        this.eventEmitter.emit(MyMapEvent.POST_DELETED, new Event(postId, req.user.userId));
        await this.postService.deletePost(req.user.userId, postId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/savedPost/:postId')
    async deleteSavedPost(@Req() req: any, @Param('postId') postId: number) {
        this.logger.debug('userId : ', req.user.userId, ' postId : ', postId);
        this.eventEmitter.emit(MyMapEvent.POST_UNSAVED, new Event(req.user.userId, postId));
        await this.postService.deleteSavedPost(req.user.userId, postId);
    }

    

}
