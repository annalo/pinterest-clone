class Api::BoardsPinsController < ApplicationController
  before_filter :require_current_user!

  def index
    @boards_pins = BoardsPin.all
    render "index"
  end

  def show
    @boards_pin = BoardsPin.find(params[:id])
    render "show"
  end

  def create
    board = Board.find(params[:boards_pin][:board_id])

    # check if board being pinned to is own board
    if current_users_board?(board)
      @boards_pin = BoardsPin.new(params[:boards_pin])
      if @boards_pin.save
        render "show"
      else
        render :json => @boards_pin.errors.full_messages, :status => 422
      end
    else
      render :json => ["Can only pin to user's boards."]
    end
  end

  def update
    @boards_pin = BoardsPin.find(params[:id])
    if @boards_pin.update_attributes(params[:board])
      render "show"
    else
      render :json => @boards_pin.errors.full_messages
    end
  end
  
  def destroy
    @boards_pin = BoardsPin.find(params[:id])
    @boards_pin.destroy
    render :json => @boards_pin
  end
end