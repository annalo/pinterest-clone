class Api::PinsController < ApplicationController
  
  def index
    @pins = Pin.all
    render "index"
  end
  
  def show
    @pin = Pin.find(params[:id])
    @boards_pins = @pin.boards_pins.first
    render "show"
  end
  
  def create
    @pin = Pin.new(params[:pin])
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
    if @pin.update_attributes(params[:pin])
      render "show"
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
