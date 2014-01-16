class Api::BoardsController < ApplicationController
  before_filter :require_current_user!
  def index
    @boards = current_user.boards
    render "index"
  end
  
  def show
    @board = Board.find(params[:id])
    render "show"
  end
  
  def new
    @categories = Category.all
    @board = current_user.boards.new
  end
  
  def create
    @board = current_user.boards.new(params[:board])
    if @board.save
      render "show"
    else
      render :json => @board.errors.full_messages
    end
  end
  
  def edit
    @categories = Category.all
    @board = Board.find(params[:id])
  end
  
  def update
    @board = Board.find(params[:id])
    if @board.update_attributes(params[:board])
      redirect_to api_board_url(@board)
    else
      render :json => @board.errors.full_messages
    end
  end
  
  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    redirect_to root_url
  end
end
