package com.study.todolist.dto.response.todo;

import com.study.todolist.entity.Todo;
import com.study.todolist.repository.TodoMapper;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class RespGetAllDto {
    private int todoId;
    private int userId;
    private String title;
    private String content;
    private int important;
    private int busy;
    private int status;
    private LocalDateTime todoDateTime;


}
