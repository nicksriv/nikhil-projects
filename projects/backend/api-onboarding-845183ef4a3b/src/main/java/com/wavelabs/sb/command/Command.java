package com.wavelabs.sb.command;

public interface Command<R, T> {
	public T execute(R request);
}
