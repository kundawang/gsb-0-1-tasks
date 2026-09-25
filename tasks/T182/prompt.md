celery 里我们用 chord，其中某个成员任务被 app.control.revoke 撤销之后，整个 chord 永远不结束——一直在等那个已经被撤掉的成员。
看着问题出在 worker 的 control revoke 这条路径上：它只在 backend 里把任务标成 REVOKED，没有把 worker 这边的 Request 一起传下去，chord 的记账就被跳过了，所以它一直等不到回调。
请修好这条路径，让撤销成员之后 chord 能正常收尾。补测试：撤销被预留的成员之后 chord 能完成、重复撤销不能重复记账、找不到的任务 id 行为跟以前一样。
