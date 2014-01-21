class Api::PinsController < ApplicationController
  def index
    @pins = Pin.all
    render "index"
  end
  
  def show
    @pin = Pin.find(params[:id])
    render "show"
  end
  
  def create
    @pin = current_user.posted_pins.new(params[:pin])
    if @pin.save
      render "show"
    else
      render :json => @pin.errors.full_messages, :status => 422
    end
  end
  
  def edit
    @boards = Board.all
    @pin = Pin.find(params[:id])
  end
  
  def update
    @pin = Pin.find(params[:id])
    board = Board.find(params[:extras][:board_id])
    if @pin.update_attributes(params[:pin])
      board.pins << @pin
      render :json => @pin
    else
      render :json => @pin.errors.full_messages
    end
  end
  
  def destroy
    @pin = Pin.find(params[:id])
    @pin.destroy
    render :json => @pin
  end
end