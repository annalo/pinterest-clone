class Api::BoardsController < ApplicationController
  before_filter :require_current_user!
  
  def index
    @boards = Board.all
    render "index"
  end
  
  def show
    @board = Board.find(params[:id])
    render "show"
  end
  
  def create
    @board = current_user.boards.new(params[:board])
    if @board.save
      render "show"
    else
      render :json => @board.errors.full_messages, :status => 422
    end
  end
  
  def edit
    @categories = Category.all
    @board = Board.find(params[:id])
  end
  
  def update
    @board = Board.find(params[:id])
    if @board.update_attributes(params[:board])
      render "show"
    else
      render :json => @board.errors.full_messages
    end
  end
  
  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    @board.boards_pins.destroy_all
    render :json => @board
  end
end
