class Api::BoardsController < ApplicationController
  before_filter :require_current_user!
  
  def create
    @board = current_user.boards.new(params[:board])
    if @board.save
      redirect_to board_url(@board)
    else
      render :json => @board.errors.full_messages
    end
  end
  
  def edit
    @board = Board.find(params[:id])
    if @board.update_attributes(params[:board])
      redirect_to board_url(@board)
    else
      render :json => @board.errors.full_messages
    end
  end
  
  def new
    @board = current_user.boards.new
  end
  
  def show
    @board = Board.find(params[:id])
  end
end
